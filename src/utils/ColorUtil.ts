export default class ColorUtil {

    public static colorConversion(color: string) {
        // 定义一个颜色转换方法，接受一个字符串形式的颜色值
        if (color.length >= 4 && color.length <= 9 && color[0] === '#') {
            // 如果颜色值为十六进制格式（例如 #FFFFFF）
            const rgba = ColorUtil.hexToRgba(color, 1);// 将颜色值转换为RGBA格式
            return {hex: color, rgba: rgba};// 返回转换后的RGBA值
        } else if (color.includes('rgb')) {
            const hex = ColorUtil.rgbaToHex(color);// 将颜色值转换为十六进制格式
            return {hex: hex, rgba: color};// 返回转换后的十六进制值
        } else {
            console.warn('color is not valid', color);// 如果颜色值格式不正确，输出警告信息
            return {hex: '#000000', rgba: 'rgba(0,0,0,1)'};
        }
    }

    public static hexToRgba(hex: string, alpha: number) {// 将十六进制颜色值转换为RGBA格式
        // 去掉颜色值中的 # 符号
        hex = hex.replace('#', '');
        // 计算 RGB 值
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        // 返回 RGBA 值
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    public static rgbaToHex(rgba: string) {// 将RGBA颜色值转换为十六进制格式
        const parts = rgba.substring(rgba.indexOf('(')).split(',');// 获取 RGBA 值中的 RGB 部分
        const r = parseInt(parts[0].substring(1).trim());// 获取 RGB 值中的 R 值
        const g = parseInt(parts[1].trim());// 获取 RGB 值中的 G 值
        const b = parseInt(parts[2].trim());// 获取 RGB 值中的 B 值
        const a = parseFloat(parts[3] ? parts[3].substring(0, parts[3].length - 1).trim() : '1');
        // 获取 RGBA 值中的 A 值

        const rr = r.toString(16).length === 1 ? "0" + r.toString(16) : r.toString(16);
        // 将 RGB 值转换为十六进制格式
        const gg = g.toString(16).length === 1 ? "0" + g.toString(16) : g.toString(16);
        // 将 G 值转换为十六进制格式
        const bb = b.toString(16).length === 1 ? "0" + b.toString(16) : b.toString(16);
        // 将 B 值转换为十六进制格式

        const aa = Math.round(a * 255).toString(16).length === 1 ? "0" + Math.round(a * 255).toString(16) : Math.round(a * 255).toString(16);
        // 将 A 值转换为十六进制格式
        return "#" + rr + gg + bb + aa;// 返回十六进制颜色值
    }

    public static parseGradient(gradient: string) {// 解析渐变颜色值
        // 提取角度
        const angle = gradient.match(/-?\d+deg/);// 提取透明度
        const angleValue = angle ? parseInt(angle[0]) : 0;// 提取颜色和位置

        // 提取颜色和位置
        const colors = gradient.match(/rgba?\([^)]+\) \d+(\.\d+)?%?/g);// 提取颜色和位置
        const parsedColors = colors?.map((color) => {
            // 解析颜色和位置
            const cutPos = color.lastIndexOf(' ');// 获取位置部分
            return {
                color: color.substring(0, cutPos),// 获取颜色部分
                pos: parseFloat(color.substring(cutPos)) / 100// 获取位置部分
            };
        });

        return {
            angle: angleValue,// 角度
            colors: parsedColors// 解析渐变颜色值
        };
    }

    public static parseAntdGradientToCss(gradient: string) {// 将 Antd 渐变颜色值转换为 CSS 渐变颜色值
        const angle = gradient.match(/l\((\d+)\)/);// 提取角度
        const angleValue = angle ? parseInt(angle[1]) : 0;// 提取颜色和位置

        const colors = gradient.match(/(\d+):rgba?\([^)]+\)/g);// 提取颜色和位置

        const parsedColors = colors?.map((color) => {
            // 解析颜色和位置
            const [pos, rgba] = color.split(':');// 获取位置部分
            return {
                color: rgba,// 获取颜色部分
                pos: parseFloat(pos) / 100// 获取位置部分
            };
        });

        return `linear-gradient(${angleValue}deg,${parsedColors?.map((color) =>
            `${color.color} ${color.pos * 100}%`)
            .join(', ')})`;
    }


}
