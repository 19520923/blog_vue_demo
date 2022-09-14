<template>
    <LikePost :post="post"/>
    <div class='btn btn-white'>
        <i class='fas fa-comment'></i>
        <span>
            Comment
        </span>
    </div>
    <div class='btn btn-white'>
        <i class='fas fa-share'></i>
        <span>
            Share
        </span>
    </div>
</template>

<script>
import LikePost from './LikePost.vue';
export default {
    props: {
        post: Object
    },
    components: { LikePost }
}
</script>

<style>

</style>