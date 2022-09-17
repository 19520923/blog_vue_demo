<template>
    <HeaderNav v-show="isLoggedIn" :user="user" :noti = "noti"/>
    <router-view />
</template>

<script>
import HeaderNav from './components/nav/HeaderNav.vue';
import { useUserStore } from '@/store/user'
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import Home from './screen/Home.vue';

export default {
    setup() {
        const store = useUserStore()
        onMounted(() => store.fetchNoti(1, 10))
        return { isLoggedIn: computed(() => store.isLoggedIn), user: computed(() => store.user), noti: computed(()=> store.notifications)}
    },

    components: { HeaderNav, Home }
}
</script>

<style lang="scss">
@import './styles/main.scss'
</style>
