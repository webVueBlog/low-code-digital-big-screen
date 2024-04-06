import React from 'react';
import './Home.less';
import {HomeMenus} from "./menus/HomeMenus";
import homeStore from "./HomeStore";//用于管理主页的状态
import {homePageMap} from "./index";
import {observer} from "mobx-react";
import Loading from "../../json-schema/ui/loading/Loading";

// 定义Home组件，使用observer包裹以响应状态变化
const Home: React.FC = observer(() => {
    // 从mobx的homeStore中获取当前选择的菜单项
    const {currentMenu} = homeStore;
    const Content = homePageMap[currentMenu];
    return (
        <div className={'da-home'}>
            <div className={'da-home-header'}>
                <div className={'logo'}>低代码数字化大屏</div>
            </div>
            <div className={'da-home-body'}>
                <div className={'da-home-body-left'}><HomeMenus/></div>
                <div className={'da-home-body-right'}>
                    {/*使用React.Suspense处理异步加载的组件，并指定加载时的fallback组件*/}
                    <React.Suspense fallback={<Loading/>}>
                        {/*如果有对应的内容组件，则渲染该组件*/}
                        {Content && <Content/>}
                    </React.Suspense>
                </div>
            </div>
        </div>
    );
})

export default Home;


