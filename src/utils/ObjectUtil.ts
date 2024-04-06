/**
 * 配置对象片段
 */
export interface ConfigureObjectFragments {
    [key: string]: ConfigureObjectFragments | string | number | null | undefined;
}
// 定义一个名为 ObjectUtil 的类，用于提供操作对象的静态方法
export default class ObjectUtil {
    /**
     * 合并两个对象，将newData中的属性合并到originalData中
     * @param originalData
     * @param newData
     */
    public static merge(originalData: any, newData: any): any {
        if (!originalData)
            return originalData
        Object.keys(newData).forEach(key => {
            // 遍历新数据中的每个键
            const newValue = newData[key];
            if (originalData.hasOwnProperty(key)) {
                // 如果原始数据中有这个键
                if (Array.isArray(newValue)) {
                    originalData[key] = newValue;
                } else if (newValue
                    && typeof newValue === "object"
                    && Object.keys(newValue).length > 0
                    && originalData[key]
                    && typeof originalData[key] === "object"
                    && !!originalData[key]) {
                    // 如果新值是非空对象，并且原始数据中该键的值也是对象，则递归合并
                    ObjectUtil.merge(originalData[key], newValue);
                } else {
                    // 否则，直接替换
                    originalData[key] = newValue;
                }
            } else {
                // 如果原始数据中没有这个键，直接添加
                originalData[key] = newValue;
            }
        });
        return originalData;
    }

    /**
     * 将字符串转换为js对象
     */
    public static stringToJsObj(code: string): object | boolean {
        if (typeof code === 'undefined' || code == null || code === '')
            return false;
        // 替换字符串中的空白和换行，并将单引号替换为双引号
        code = code.replace(/[\s+\n]+/g, '').replace(/'/g, '"');
        try {
            // 尝试将字符串解析为JSON对象
            return JSON.parse(code);
        } catch (e) {
            // 如果解析失败，返回false
            return false;
        }
    }

    /**
     * 获取原始对象中的属性值
     */
    public static getOriginValue(originObj: ConfigureObjectFragments, newObj: ConfigureObjectFragments): ConfigureObjectFragments {
        function findAndExtract(original: ConfigureObjectFragments, updated: ConfigureObjectFragments): ConfigureObjectFragments {
            //内部函数，用于提取原始对象中的值
            const result: ConfigureObjectFragments = {};
            for (const key in updated) {
                // 遍历新对象的每个键
                if (typeof updated[key] === 'object' && !Array.isArray(updated[key]) && original[key]) {
                    // 如果新对象中该键对应的是非数组对象，并且原始对象中存在这个键
                    if (original[key]) {
                        // 递归地获取该键对应的原始对象值
                        result[key] = findAndExtract(original[key] as ConfigureObjectFragments, updated[key] as ConfigureObjectFragments);
                    }
                } else {
                    // 否则，直接获取原始对象中该键的值
                    result[key] = original[key];
                }
            }
            return result;
        }

        // 调用内部函数并返回结果
        return findAndExtract(originObj, newObj);
    }
}

