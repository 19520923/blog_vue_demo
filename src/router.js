import { createRouter, createWebHistory } from "vue-router";
import Auth from '@/screen/Auth.vue'
import Post from '@/components/post/Post.vue'


const routers = [
    {
        path: '/',
        component: Auth
    },
    {
        path: '/home',
        component: Post
    },
    {
        path: '/:catchAll(.*)',
        component: Auth
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routers
})

export default router