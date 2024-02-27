import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        name:"home",
        component: () => import('../views/Home/index.vue'),
    },
    {
        path: '/user',
        name:"user",
        component: () => import('../views/User/index.vue'),
    },
]

export default routes;