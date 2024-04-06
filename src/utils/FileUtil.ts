export default class FileUtil {
    //计算给定文件的SHA-256哈希值，并从中截取前16位字符
    // 注意：直接截取16位hash值可能会增加hash碰撞的风险。此时需要尤其关注使用情况
    public static async getFileHash(file: File): Promise<string> {
        // 定义一个静态异步方法 getFileHash，它接收一个文件对象并返回一个字符串的Promise
        // 实现方法：使用 FileReader API 读取文件内容，并使用 crypto.subtle.digest 计算 SHA-256 哈希值
        // 然后将哈希值转换为字符串并返回
        // 将文件对象转换为ArrayBuffer
        const buffer = await file.arrayBuffer();
        // 使用SHA-256算法对ArrayBuffer进行加密处理，得到哈希值
        const hashArray = await crypto.subtle.digest('SHA-256', buffer);
        // 将得到的哈希值转换为16进制表示的字符串，然后截取前16
        return Array.from(new Uint8Array(hashArray))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('').substring(0, 16); //直接截取16位hash值可能会增加hash碰撞的风险。此时需要尤其关注使用情况
    }
}