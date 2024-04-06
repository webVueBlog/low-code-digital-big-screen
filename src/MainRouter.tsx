import {lazy, Suspense} from 'react';
import {Route, Routes} from "react-router-dom";
import Loading from "./json-schema/ui/loading/Loading";
import {ConfigProvider, MappingAlgorithm, theme} from "antd";
import GlobalMessage from "./framework/message/GlobalMessage";
//加载全局字体，这个需要考量一下，在此处加载是否合适
import './designer/resource/font/FontGlobal.css';

//使用lazy函数实现组件的动态导入（懒加载）
const Demo = lazy(() => import('./test/Demo.tsx'));
const Login = lazy(() => import('./pages/login/Login').then(
    module => ({default: module.Login})
));
const Designer = lazy(() => import('./designer/Designer'));
const DesignerView = lazy(() => import('./designer/view/DesignerView'));
const Home = lazy(() => import('./pages/home/Home'));

/**
 *  路由配置
 * @param seedToken
 * @param mapToken
 */
export const studioDarkAlgorithm: MappingAlgorithm = (seedToken, mapToken) => {
    // 使用 antd 默认的暗色算法生成基础token，这样其他不需要定制的部分则保持原样
    const baseToken = theme.darkAlgorithm(seedToken, mapToken);// 基础的暗色主题
    return {
        ...baseToken,
        colorBgLayout: '#20252b', // Layout 背景色
        colorBgContainer: '#282c34', // 组件容器背景色
        colorBgElevated: '#32363e', // 悬浮容器背景色
    };
};


export default function MainRouter() {
    return (
        <ConfigProvider theme={{/* 暗黑模式 */
            algorithm: studioDarkAlgorithm,// 暗黑模式算法
            components: {// 暗黑模式组件
                Menu: {// 菜单
                    itemBg: 'none',// 菜单项背景色
                    itemColor: '#bfbfbf',// 菜单项文字颜色
                }
            }
        }}>
            <Suspense fallback={<Loading/>}>
                <Routes>
                    <Route path={'/designer'} element={<Designer/>}/>
                    <Route path={'/view'} element={<DesignerView/>}/>
                    <Route path={'/test'} element={<Demo/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/home'} element={<Home/>}/>
                    <Route path={'/'} element={<Login/>}/>
                </Routes>
            </Suspense>
            <GlobalMessage/>
        </ConfigProvider>
    );
}