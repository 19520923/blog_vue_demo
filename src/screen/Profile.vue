<template>
    <div className='home-page' id="infinite-list">
        <ProfileHeader :user="currentUser" />
        <Post v-for="post in this.posts.rows" :post="post" :key="post._id" />
    </div>
</template>

<script>
import ProfileHeader from '@/components/profile/ProfileHeader.vue';
import { useUserStore } from '@/store/user';
import { computed } from '@vue/reactivity';
import { onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import Post from '@/components/post/Post.vue';
import { usePostStore } from '@/store/post';
import Right from '@/components/nav/Right.vue';
export default {
    setup() {
        const postStore = usePostStore()
        const userStore = useUserStore()
        const route = useRoute()

        onMounted(() => {
            const user_id = route.params.user_id
            postStore.setUserPosts(user_id)
            const listElm = document.querySelector('#infinite-list');
            listElm.addEventListener('scroll', e => {
                if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
                    postStore.fetchUserPosts(user_id)
                }
            })
        })
        onUnmounted(() => {
            userStore.currentUser = {}
            postStore.userPosts = []
        })

        return {
            currentUser: computed(() => userStore.currentUser),
            posts: computed(() => postStore.userPosts)
        }

    },

    components: { ProfileHeader, Post, Right }
}
</script>