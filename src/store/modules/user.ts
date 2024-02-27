import { defineStore } from "pinia";

export type User = {
    name: string;
    email: string;
    avatar: string;
    role: string;
    status: string;
    lastSeen: string;
}

const useStore = defineStore('useStore', {
    // state
    state: () => ({
        name: 'John Doe',
        email: 'john.doe@gmail.com',
        avatar: 'https://i.pravatar.cc/300?img=10',
        role: 'admin',
        status: 'online',
        lastSeen: '2021-08-24T15:13:00.000Z',
    }),
    // getters 用于获取 state 的属性
    getters: {
        getAvatar: (state) => state.avatar,
        getName: (state) => state.name,
        getEmail: (state) => state.email,
        getRole: (state) => state.role,
        getStatus: (state) => state.status,
        getLastSeen: (state) => state.lastSeen,
    },
    // actions 相当于组件中的 methods
    actions: {
        updateName(name: string) {
            this.name = name;
        },
        updateEmail(email: string) {
            this.email = email;
        },
        updateAvatar(avatar: string) {
            this.avatar = avatar;
        },
        updateRole(role: string) {
            this.role = role;
        },
        updateStatus(status: string) {
            this.status = status;
        },
    }
})
export default useStore;