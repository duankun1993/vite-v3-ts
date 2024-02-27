import http from "@/configs/http";
import { useFileStore } from "@/store/modules/file";

let fileStore: any;

export const initializeFileStore = () => {
    fileStore = useFileStore();
};

/**
 * 文件下载
 * @param path 文件路径
 * @returns 
*/
export const query_file_download = async (path: string) => {
    const { urlCache } = fileStore;
    if (!urlCache[path]) {
        const res:{ url: string } = await http.post('/app/file/download', { path });
        fileStore.setUrlCache({key: path, value: res.url?.split("?")[0] })
        return res;
    }
    return { url: urlCache[path] };
};