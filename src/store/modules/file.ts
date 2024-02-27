import { defineStore } from 'pinia';

type UrlCache = {
    [key: string]: string;
}

export const useFileStore = defineStore('file', {
    state: () => ({
        urlCache: {} as UrlCache
    }),
    actions: {
        setUrlCache({ key, value }: { key: string, value: string }) {
            this.urlCache[key] = value;
        },
    },
});