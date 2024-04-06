import React, {FormEvent} from 'react';
import './AddNewScreenDialog.less';
import Dialog from "../../../json-schema/ui/dialog/Dialog";
import Button from "../../../json-schema/ui/button/Button";
import {Grid} from "../../../json-schema/ui/grid/Grid";
import NumberInput from "../../../json-schema/ui/number-input/NumberInput";
import Input from "../../../json-schema/ui/input/Input";

export interface INewProjectInfo {
    name: string;
    des?: string;
    width: number;
    height: number;
}

interface AddNewScreenDialogProps {
    onOk?: (data: INewProjectInfo) => void;
    onCancel?: () => void;
    visible?: boolean;
}
// 定义AddNewProjectDialog组件
/**
 * @param props
 */
export const AddNewProjectDialog: React.FC<AddNewScreenDialogProps> = (props) => {

    const projectInfo: INewProjectInfo = {
        name: '',
        des: '',
        width: 500,
        height: 300,
    }

    const onOk = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();// 阻止表单提交
        const {onOk} = props;
        onOk && onOk(projectInfo);
    }

    const onCancel = () => {
        const {onCancel} = props;// 关闭弹窗
        onCancel && onCancel();
    }

    const {visible = false} = props;// 控制弹窗是否可见
    return (
        <Dialog title={'新建大屏'} visible={visible} className={'add-new-screen-dialog'} onClose={onCancel}>
            <form onSubmit={onOk}>
                <div className={'da-add-new-screen'}>
                    <Grid gridGap={'15px'} columns={2}>
                        <Input label={'名称'} maxLength={20}
                               onChange={(name: string | number) => projectInfo.name = name as string}/>
                        <Input label={'描述'} maxLength={20}
                               onChange={(description: string | number) => projectInfo.des = description as string}/>
                        <NumberInput label={'宽度'} min={300}
                                     onChange={(width: string | number) => projectInfo.width = Number(width)}/>
                        <NumberInput label={'高度'} min={300}
                                     onChange={(height: number | string) => projectInfo.height = Number(height)}/>
                    </Grid>
                </div>
                <div className={'add-new-screen-explain'}>
                    <p>说明：</p>
                    <p>1、名称不超过20字，描述不超过60字</p>
                    <p>2、宽度必须&ge;500，高度必须&ge;300</p>
                </div>
                <div className={'add-new-screen-footer'}>
                    <Button type={"submit"}>创建</Button>
                    <Button onClick={onCancel}>取消</Button>
                </div>
            </form>
        </Dialog>
    );
}

export default AddNewProjectDialog;