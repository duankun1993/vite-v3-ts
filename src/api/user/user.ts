import http from "@/configs/http";
import { rsaEncrypt } from "@/utils/rsaEncrypt";

interface ApiResponse<T> {
    code: number;
    data: T;
    message: string;
}
console.log(rsaEncrypt('asd'));

export async function register<T>(account: string, pwd: string): Promise<ApiResponse<T>> {
    const psw = rsaEncrypt(pwd);
    const response = await http.post<ApiResponse<T>>('/app/user/sign_up', { account, psw });
    return response.data;
};