<template>
    <div class="home-page">
        <Post v-for="post in posts" :post="post" :key="post._id" />
    </div>
</template>

<script>
import Post from '@/components/post/Post.vue';
import { computed } from '@vue/reactivity';
import { usePostStore } from '@/store/post'
import { onMounted } from 'vue';

export default {
    setup() {
        const post = usePostStore()
        onMounted(() => {
            post.fetchPosts(1, 20)
        })
        return { posts: computed(() => post.posts), fetchPosts: post.fetchPosts }
    },
    components: { Post },

}
</script>
