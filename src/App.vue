<template>
    <router-view/>
</template>

<script>
import Auth from './screen/Auth.vue';
import LikePost from './components/post/LikePost.vue';
import PostFooter from './components/post/PostFooter.vue';
import Post from './components/post/Post.vue';

export default {
    data() {
    },
    components: { Auth, LikePost, PostFooter, Post }
}
</script>

<style lang="scss">
@import './styles/main.scss'
</style>
