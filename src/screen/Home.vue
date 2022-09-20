<template>
    <div class="home-page" id="infinite-list">
        <FormCard />
        <Post v-for="post in this.posts.rows" :post="post" :key="post._id" />
    </div>
</template>

<script>
import Post from '@/components/post/Post.vue';
import FormCard from '@/components/post/createPost/FormCard.vue';
import { computed } from '@vue/reactivity';
import { usePostStore } from '@/store/post'
import { useUserStore } from '@/store/user';

export default {
    setup() {
        const post = usePostStore()
        const user = useUserStore()

        return { posts: computed(() => post.posts), setPosts: post.setPosts, fetchNoti: user.fetchNoti, fetchPosts: post.fetchPosts }
    },
    mounted() {
        this.setPosts()
        this.fetchNoti(1, 20)
        const listElm = document.querySelector('#infinite-list');
        listElm.addEventListener('scroll', e => {
            if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
                this.fetchPosts()
            }
        })
    },
    components: { Post, FormCard },

}
</script>
