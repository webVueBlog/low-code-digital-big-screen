import {customAlphabet} from "nanoid";

class IdGenerate {

    public static generateId(): string {
        const generateUniqueId = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 10);
        // 调用 generateUniqueId 函数生成一个唯一的ID并返回
        return generateUniqueId();
    }
}

export default IdGenerate;

