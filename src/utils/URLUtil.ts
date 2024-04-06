// 定义一个 TypeScript 接口 UrlParams，它是一个键值对的字典，键和值都是字符串类型
export interface UrlParams {
    [key: string]: string;
}

export default class URLUtil {

    public static parseUrlParams(): UrlParams {
        // 创建一个 URLSearchParams 对象，用于解析当前浏览器窗口URL的查询字符串部分
        const urlParams: URLSearchParams = new URLSearchParams(window.location.search);
        const params: UrlParams = {};
        for (const [key, value] of urlParams) {
            params[key] = value;
        }
        return params;
    }

}