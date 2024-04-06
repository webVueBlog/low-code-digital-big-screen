import React, {ComponentType} from "react";

const LocalProjectList =
    React.lazy(() => import('./local-list/LocalProjectList')
        .then(module => ({default: module.LocalProjectList})));
const ServerProjectList =
    React.lazy(() => import('./server-list/ServerProjectList')
        .then(module => ({default: module.ServerProjectList})));
const DatasourceManager =
    React.lazy(() => import('./datasource/DatasourceManager')
        .then(module => ({default: module.DatasourceManager})));
const TemplateMarket =
    React.lazy(() => import('./template-market/TemplateMarket')
        .then(module => ({default: module.TemplateMarket})));
// 将这些组件映射到 homePageMap 对象中，对象的键是字符串，值是组件类型。
// 此对象可以用于根据给定的键（如'local'、'server'等）动态渲染相应的组件。
export const homePageMap: Record<string, ComponentType> = {
    local: LocalProjectList,
    server: ServerProjectList,
    datasource: DatasourceManager,
    template: TemplateMarket
}