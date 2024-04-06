import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],// 配置代理
    server: {
        proxy: {
            '^/(api|images|covers)/.*': {
                target: 'http://127.0.0.1:8080',
                changeOrigin: true,// 是否改变源地址
            }
        }
    }
})
