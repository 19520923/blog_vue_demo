<template>
    <HeaderNav v-if="isLoggedIn" :user="user" :noti="noti" />
    <Right v-if="isLoggedIn"/>
    <router-view />
</template>

<script>
import HeaderNav from './components/nav/HeaderNav.vue';
import { useUserStore } from '@/store/user'
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import Home from './screen/Home.vue';
import axios from "axios"
import Right from './components/nav/Right.vue';

export default {
    setup() {
        const store = useUserStore()
        onMounted(() => {
            if (store.token) {
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${store.token}`;
            }
        })
        return { token: computed(() => store.token), isLoggedIn: computed(() => store.isLoggedIn), user: computed(() => store.user), noti: computed(() => store.notifications) }
    },
    watch:
    {
        token(newValue) {
            axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${newValue}`;
        }
    },
    components: { HeaderNav, Home, Right }
}
</script>

<style lang="scss">
@import './styles/main.scss'
</style>
