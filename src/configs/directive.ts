import default_avatar from '@/assets/icons/avatar.png';
import { query_file_download, initializeFileStore } from '@/api/file';
async function setPath(el: HTMLImageElement | HTMLVideoElement, binding: any) {
    if (!binding.value) {
        return el.src = default_avatar;
    } else {
        let value: string = '';
        if (typeof binding.value === 'object') {
            value = binding.value.value;
            let oldValue = binding.oldValue?.value;
            if (oldValue == value && value != null) return;
            let el_type = binding.value.type || '';
            if (el_type === 'avatar' && !value) {
                return el.src = default_avatar;
            }
        } else {
            value = binding.value
            if (binding.oldValue == value) return;
        }
        if (!value) return el.src = "";
        const reg_result = value?.indexOf("https") == 0;
        if (reg_result) {
            el.src = value;
        } else {
            const { url } = await query_file_download(value);
            el.src = url.split('?')[0];
        }
    }
}

export default {
    install(app: any) {
        initializeFileStore();
        app.directive('path2url', {
            mounted(el: HTMLImageElement | HTMLVideoElement, binding: any) {
                setPath(el, binding);
            }
        });
        app.directive('opacityEnter', {
            mounted(el: HTMLElement, binding: any) {
                const delay = binding.value ?? 50;
                el.style.opacity = '0';
                el.style.transition = "all 0.5s ease";
                const T = setTimeout(() => {
                    clearTimeout(T);
                    el.style.opacity = '1';
                }, delay);
            }
        })
    }
}

