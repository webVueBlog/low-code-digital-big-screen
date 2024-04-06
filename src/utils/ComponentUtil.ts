import React, {ClassType} from "react";
import {createRoot} from "react-dom/client";
//用于在给定的HTML容器中创建并渲染一个React组件
/**
 *  创建并渲染一个React组件
 * @param container 指定的HTML容器
 * @param clazzTemp React类组件及其属性
 * @param props 组件的属性
 * @returns 组件的实例或null
 * @example
 * const container = document.getElementById('root');
 * const MyComponent = React.lazy(() => import('./MyComponent'));
 * //const props = {}
 * const component = await ComponentUtil.createAndRender(container, MyComponent, props);
 * // 使用组件的实例
 * console.log(component);
 * // 返回组件的实例或null
 * console.log(component instanceof MyComponent);
 * // 返回组件的类型
 * console.log(component.type);
 * // 返回组件的属性
 * console.log(component.props);
 * // ...其他操作
 *
 */
class ComponentUtil {

    public static async createAndRender<T, P = any>(container: HTMLElement, clazzTemp: ClassType<P, any, any>, props?: any): Promise<T | null> {
        // 定义一个静态异步方法 createAndRender，该方法接受一个HTML容器、React类组件及其属性，返回Promise，其中包含组件的实例或null
        if (!container)
            throw new Error("create react node failed, container is null");
        // 如果未提供容器，抛出错误
        return await new Promise<T | null>((resolve) => {
            try {
                createRoot(container).render(React.createElement(clazzTemp, {
                    // 使用createRoot在指定容器中创建一个React根节点，并渲染元素
                    ref: (instance: T) => resolve(instance),
                    // 设置ref以在组件挂载时获得其实例，并解析Promise
                    ...props
                    // 将提供的props传递给组件
                }))
            } catch (e: unknown) {
                // 捕获并处理任何异常
                console.error('create react node failed ', e)
                // 解析Promise为null
                resolve(null);
            }
        });
    }
}

export default ComponentUtil;