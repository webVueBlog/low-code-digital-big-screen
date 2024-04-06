import React from "react";
import {CloudServerOutlined, DatabaseOutlined, HomeOutlined, ShoppingOutlined} from "@ant-design/icons";
import homeStore from "../HomeStore";
import {Menu} from "antd";
import {MenuItemType} from "antd/es/menu/hooks/useItems";

const menus: MenuItemType[] = [
    {
        key: 'local',
        icon: <HomeOutlined/>,
        label: '开发项目'
    },
    {
        key: 'server',
        icon: <CloudServerOutlined/>,
        label: '生产项目'
    },
    {
        key: 'datasource',
        icon: <DatabaseOutlined/>,
        label: '数据源管理'
    },
    {
        key: 'template',
        icon: <ShoppingOutlined/>,
        label: '模板'
    }
]

export const HomeMenus: React.FC = () => {// 菜单

    const changeMenu = (menu: MenuItemType) => {// 切换菜单
        const {setCurrentMenu} = homeStore;// 设置当前菜单
        setCurrentMenu(menu.key as string);
    }

    return (
        <div className={'lc-home-menus'}>
            <Menu onClick={changeMenu}
                  style={{width: 256}}
                  defaultSelectedKeys={['local']}
                  mode="inline"
                  items={menus}
            />
            {/* 引入 Menu 组件：
                - onClick: 当菜单项被点击时触发的回调函数，这里指定为 changeMenu 函数。
                - style: 为菜单设置内联样式，这里设置了菜单的宽度为 256px。
                - defaultSelectedKeys: 设置默认选中的菜单项，这里默认选中的键为 'local'。
                - mode: 设置菜单模式，这里使用 'inline' 模式，表示菜单以内联方式展现，通常是垂直展现。
                - items: 菜单项数据，这里传入一个menus数组，数组中的每个元素代表一个菜单项。
            */}
        </div>
    );
}