<template>
    <HeaderNav v-if="isLoggedIn" :user="user" :noti="noti" />
    <router-view />
</template>

<script>
import HeaderNav from './components/nav/HeaderNav.vue';
import { useUserStore } from '@/store/user'
import { computed } from '@vue/reactivity';
import { onMounted, onUnmounted } from 'vue';
import Home from './screen/Home.vue';
import axios from "axios"
import Right from './components/nav/Right.vue';
import { io } from "socket.io-client";
import { usePostStore } from './store/post';
import { storage } from './firebase/firebase';

export default {
    setup() {
        const store = useUserStore()
        const postStore = usePostStore()

        return {
            token: computed(() => store.token),
            isLoggedIn: computed(() => store.isLoggedIn),
            user: computed(() => store.user),
            noti: computed(() => store.notifications),
            addPost: postStore.addPost,
            addComment: postStore.addComment,
            addLike: postStore.addLike,
            addNoti: store.addNoti
        }
    },
    data() {
        return {
            socketio: null
        }
    },

    mounted() {
        if (this.token && this.isLoggedIn) {
            axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${this.token}`;

            // if (this.token) {
            //     this.socketio = io("https://foodtalk-server.herokuapp.com", {
            //         transports: ["websocket"],
            //         extraHeaders: {
            //             Authorization: `Bearer ${this.token}`
            //         }
            //     });

            //     this.socketio.on("connect", () => {
            //         console.log("connected");
            //     });

            //     this.socketio.on("friend-login-status", ({ user_id }) => {
            //         //userDispatch({ type: 'FOLLOWER_LOGIN', payload: user_id })
            //     });

            //     this.socketio.on("friend-logout-status", ({ user_id }) => {
            //         //userDispatch({ type: 'FOLLOWER_LOGOUT', payload: user_id })
            //     });

            //     this.socketio.on("new-message", ({ data }) => {
            //         // dispatch(addMessage(data));
            //     });

            //     this.socketio.on("message-seen", ({ data }) => {
            //         //do something
            //     });

            //     this.socketio.on("new-food", ({ data }) => {
            //         //do something
            //     });

            //     this.socketio.on("new-food-rate", ({ data }) => {
            //         // dispatch(addRate(data));
            //     });

            //     this.socketio.on("delete-food-rate", ({ data }) => {
            //         //do something
            //     });

            //     this.socketio.on("new-post", ({ data }) => {
            //         //postDispatch({ type: 'ADD_POST', payload: data })
            //         this.addPost(data)
            //     });

            //     this.socketio.on("like-post", ({ data }) => {
            //         this.addLike(data)
            //     });

            //     this.socketio.on("dislike-post", ({ data }) => {
            //         //do something
            //         this.addLike(data)
            //     });

            //     this.socketio.on("new-comment-post", ({ data }) => {
            //         //do something
            //         // postStore.addComment(data)
            //     });

            //     this.socketio.on("follow-request-status", ({ data }) => {
            //         //do something
            //     });

            //     this.socketio.on("notification", ({ data }) => {
            //         //({ type: 'ADD_NOTIFICATION', payload: data })
            //         this.addNoti(data)
            //     });
            // }
        }
    },

    // unmounted() {
    //     this.socketio.disconnect();
    //     //dispatch(setSocketio(null))
    //     console.log("disconnect");
    // },
    watch: {
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
