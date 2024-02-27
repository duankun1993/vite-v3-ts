import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { message } from "ant-design-vue";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const http: AxiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
});

// 添加请求拦截器
http.interceptors.request.use(
    (config) => {
        // 在发送请求之前做些什么
        return config;
    },
    (error: any) => {
        // 处理请求错误
        return Promise.reject(error);
    },
);

// 添加响应拦截器
http.interceptors.response.use(
    (response: AxiosResponse) => {
        const { data } = response;
        if (data.errorCode == 1) {
            clearCatch();
            message.error("Account expired, please log in again.");
            const T = setTimeout(() => {
                clearTimeout(T)
                window.location.href = "/";
            }, 1000);
            return
        } else {
            if (data.errorCode !== 0) {
                message.error(data.errorMsg);
                return Promise.reject(data.errorMsg);
            } else {
                return data.data;
            }
        }
    },
    (error: any) => {
        // 处理响应错误
        return Promise.reject(error);
    },
);

function clearCatch() {
    window.localStorage.clear()
}

export default http;