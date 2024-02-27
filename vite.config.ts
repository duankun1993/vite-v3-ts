import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dotenv from 'dotenv'

// 加载环境变量文件
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': '/src'
        }
    },
    base: '/',
    server: {
        port: 4000,
        open: true,
        cors: true
    }
})
