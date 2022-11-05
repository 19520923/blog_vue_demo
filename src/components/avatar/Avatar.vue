<template>
    <img :class="`avatar-cg ${this.size}`" :src="this.user.avatar_url" alt="avatar" @click="handleClick"/>
</template>

<script>
import { useUserStore } from '@/store/user';
import { computed } from '@vue/reactivity';

export default {
    setup(){
        const userStore = useUserStore()
        return {
            setCurrentUser: userStore.setCurrentUser
        } 
    },
    props:["size", "user"],
    methods: {
        handleClick(){
            this.setCurrentUser(this.user)
            this.$router.push({name: "profile", params: {user_id: this.user._id}})
        }
    }
}
</script>

