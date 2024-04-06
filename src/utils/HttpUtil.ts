export default class HttpUtil {
    public static async sendHttpRequest(url: string, method: string, headers: any, params: any) {
        // 定义一个静态异步方法 sendHttpRequest，接收url、请求方法、请求头和参数
        const requestOptions: any = {
            method: method.toUpperCase(),
            headers: headers,
        };
        if (method.toUpperCase() === 'POST') {
            requestOptions.headers['Content-Type'] = 'application/json';
            // 将参数转换为JSON字符串并设置为请求体
            requestOptions.body = JSON.stringify(params);
        } else if (method.toUpperCase() === 'GET') {
            const queryParams = new URLSearchParams(params).toString();
            url += `?${queryParams}`;
        }
        // 使用fetch API发送请求，并等待响应
        const response = await fetch(url, requestOptions);
        // 将响应转换为JSON对象并返回
        return await response.json();
    }
}
