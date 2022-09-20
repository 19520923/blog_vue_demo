<template>
    <HeaderNav v-show="isLoggedIn" :user="user" :noti="noti" />
    <router-view />
</template>

<script>
import HeaderNav from './components/nav/HeaderNav.vue';
import { useUserStore } from '@/store/user'
import { computed } from '@vue/reactivity';
import Home from './screen/Home.vue';
import axios from "axios"

export default {
    setup() {
        const store = useUserStore()
        return { token: computed(() => store.token), isLoggedIn: computed(() => store.isLoggedIn), user: computed(() => store.user), noti: computed(() => store.notifications) }
    },
    watch: {
        token(newValue) {
            axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${newValue}`;
        }
    },

    components: { HeaderNav, Home }
}
</script>

<style lang="scss">
@import './styles/main.scss'
</style>
