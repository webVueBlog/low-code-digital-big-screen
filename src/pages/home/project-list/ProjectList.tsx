import React, {useEffect, useRef} from 'react';
import './ProjectList.less';
import {Card} from "antd";
import defaultSnapshot from '../image/default-snapshot.jpg';

import {CopyFilled, DeleteFilled, EditFilled, EyeFilled} from "@ant-design/icons";
import {DesignerMode, IProjectInfo, SaveType} from "../../../designer/DesignerType";
import {AddNewProjectDialog, INewProjectInfo} from "./AddNewProjectDialog";
import Button from "../../../json-schema/ui/button/Button";
import Dialog from "../../../json-schema/ui/dialog/Dialog";
import operatorMap from "../../../framework/operate";
import {globalMessage} from "../../../framework/message/GlobalMessage";

export interface ProjectListProps {
    saveType: SaveType;// 保存类型
}

/**
 *  项目列表
 * @param props
 * @constructor
 */
export const ProjectList: React.FC<ProjectListProps> = (props) => {
    // setAddDialog 是一个用来设置 addDialog 值的函数。当用一个新值调用 setAddDialog 时
    // 它会更新 addDialog 的值，并导致组件用新状态重新渲染。
    const [addDialog, setAddDialog] = React.useState(false);
    // 添加项目弹窗
    const [delDialog, setDelDialog] = React.useState(false);
    // 删除项目弹窗
    const [cloneDialog, setCloneDialog] = React.useState(false);
    // 克隆项目弹窗

    const [data, setData] = React.useState<IProjectInfo[]>([]);
    // 项目列表数据
    const delIdRef = useRef<string>("");// 删除项目id
    const cloneIdRef = useRef<string>("");// 克隆项目id

    /**
         useEffect(() => {
         // 副作用逻辑

         return () => {
         // 在组件卸载或依赖项更新前运行的清理逻辑 用于执行必要的清理工作，如取消订阅或清除计时器等。
         };
         }, [dependency]);

         useEffect 会在每次渲染后运行指定的副作用逻辑。
         通过传入一个空数组（[]）作为第二个参数，可以确保该 useEffect 只会在组件挂载时执行一次。
     */
    useEffect(() => {// 页面加载时执行
        getProjectList();// 获取项目列表
    }, []);

    const toggleNewProVisible = () => setAddDialog(!addDialog);// 切换添加项目弹窗显示状态

    const onOk = (data: INewProjectInfo) => {// 添加项目弹窗确定按钮
        const {saveType} = props;// 获取保存类型
        const {name, des, width, height} = data;// 获取项目信息
        const project: IProjectInfo = {// 创建项目信息
            name: name,// 项目名称
            des: des,// 项目描述
            saveType: saveType,// 保存类型
            dataJson: JSON.stringify({canvasConfig: {width, height}}),// 项目数据
        }
        operatorMap[saveType].createProject(project).then((id) => {// 创建项目
            if (id === "")
                globalMessage.messageApi?.error('创建失败');
            else {
                setAddDialog(false);
                window.open(`/designer?id=${id}&saveType=${saveType}&mode=${DesignerMode.EDIT}`, '_blank');
                getProjectList();// 重新获取项目列表
            }
        });
    }

    const onCancel = () => setAddDialog(false);

    const operateHandler = (id: string, type: string) => {// 操作项目按钮点击事件
        const {saveType} = props;
        switch (type) {
            case 'edit':
                window.open(`/designer?id=${id}&saveType=${saveType}&mode=${DesignerMode.EDIT}`, '_blank');
                break;
            case 'show':
                window.open(`/view?id=${id}&saveType=${saveType}&mode=${DesignerMode.VIEW}`, '_blank');
                break;
            case 'del':
                delIdRef.current = id;
                setDelDialog(true);
                break;
            case 'clone':
                cloneIdRef.current = id;
                setCloneDialog(true);
                break;
        }
    }

    const cancelDel = () => setDelDialog(false);

    const confirmClone = () => {
        const {saveType} = props;// 获取保存类型
        operatorMap[saveType].copyProject(cloneIdRef.current).then((id) => {
            if (id !== "") {
                setCloneDialog(false);// 关闭克隆对话框
                getProjectList();// 重新获取项目列表
                globalMessage.messageApi?.success('克隆成功');
            } else {
                globalMessage.messageApi?.error('克隆失败');
            }
        });
    }

    const cancelClone = () => setCloneDialog(false);

    const getProjectList = () => {// 获取项目列表
        const {saveType} = props;
        operatorMap[saveType].getProjectInfoList().then((data: IProjectInfo[]) => setData(data));
    }

    const confirmDel = () => {
        const {saveType} = props;
        operatorMap[saveType].deleteProject(delIdRef.current).then((res) => {
            if (res) {
                setDelDialog(false);// 关闭删除对话框
                getProjectList();
            } else {
                globalMessage.messageApi?.error('删除失败');
            }
        });

    }

    return (
        <div className={'project-list-container'}>
            <div className={'project-list'}>
                <div className={'create-new-btn'}>
                    <Button onClick={toggleNewProVisible}
                            style={{fontSize: 20, width: '100%', height: '100%'}}>+ 新建项目</Button>
                </div>
                {data && data.map((item: IProjectInfo, index) => {
                    // 映射data数组到项目卡片，data包含项目信息
                    // item.id不会是null或undefined
                    return (
                        <div key={index} className={'project-item'}>
                            <Card style={{padding: 2}}
                                  cover={
                                <div className={'project-cover'}
                                     style={{backgroundImage: `url(${item.cover || defaultSnapshot})`}}>
                                <div className={'project-info'}>
                                    项目名称：{item.name}
                                </div>
                            </div>}
                                  bodyStyle={{padding: 0}}
                                  bordered={true}
                                  hoverable={true}
                                  size={'small'}
                                  actions={[
                                      <EditFilled key={'edit'} onClick={() => operateHandler(item.id!, "edit")}/>,
                                      <EyeFilled key={'show'} onClick={() => operateHandler(item.id!, "show")}/>,
                                      <DeleteFilled key={'del'} onClick={() => operateHandler(item.id!, "del")}/>,
                                      <CopyFilled key={'clone'} onClick={() => operateHandler(item.id!, "clone")}/>,
                                  ]}>
                            </Card>
                        </div>
                    )
                })}
            </div>
            <AddNewProjectDialog onOk={onOk}                 onCancel={onCancel}    visible={addDialog}/>
            <DeleteDialog        onOk={confirmDel}           onCancel={cancelDel}   visible={delDialog}/>
            <CloneDialog         onOk={() => confirmClone()} onCancel={cancelClone} visible={cloneDialog}/>
        </div>
    );
}

export default ProjectList;


interface DelDialogProps {
    onOk: () => void;
    onCancel: () => void;
    visible: boolean;
}

const DeleteDialog = (props: DelDialogProps) => {

    const {onOk, onCancel, visible} = props;

    return (
        <Dialog title={'删除确认'} visible={visible} onClose={onCancel}>
            <div style={{color: '#aeaeae', padding: 10}}>确定要删除该项目吗？</div>
            <div className={'del-pro-confirm'} style={{
                display: 'flex',// 水平布局
                justifyContent: 'flex-end',// 水平居中
                borderTop: '2px solid #272b34',// 添加一个上边框
                paddingTop: 5// 设置上边距
            }}>
                <Button onClick={onOk}>确认</Button>&nbsp;&nbsp;
                <Button onClick={onCancel}>取消</Button>
            </div>
        </Dialog>
    )
}

interface CloneDialogProps {
    onOk: () => void;
    onCancel: () => void;
    visible: boolean;
}

const CloneDialog = (props: CloneDialogProps) => {

    const {onOk, onCancel, visible} = props;


    const onClick = (event: React.MouseEvent): void => {
        event.preventDefault();
        onOk();
    }

    return (
        <Dialog title={'克隆项目'} visible={visible} onClose={onCancel}>
            <div style={{color: '#a7a7a7', padding: 10}}>确认复制吗？</div>
            <div className={'del-pro-confirm'} style={{
                display: 'flex',
                justifyContent: 'flex-end',
                borderTop: '2px solid #272b34',
                paddingTop: 10
            }}>
                <Button onClick={onClick}>确认</Button> &nbsp;&nbsp;
                <Button onClick={onCancel}>取消</Button>
            </div>
        </Dialog>
    )
}