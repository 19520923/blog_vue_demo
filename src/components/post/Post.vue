<template>
    <div class="card card-post">

        <div class="card__title">
            <div>
                <img class='avatar-cg large' src='../../assets/background.jpg'
                    alt="avatar" />
                <div>
                    <h6>Nguyen Nhut Tan</h6>
                    <span>12h ago</span>
                </div>
            </div>

            <div class='btn-icon btn-icon-exit'>
                <i class='fas fa-ellipsis-v'></i>
            </div>
        </div>

        <div class="card__content">
            <PostContent />
        </div>

        <div class="card__footer">
            <PostFooter />
        </div>

        <div class='card__actions'>
            <PostAction />
        </div>

        <!-- {isCommentOpen&&<div class = 'card__comments'>
    <PostComments post={post} isOpen = {isCommentOpen}/>
</div>} -->

    </div>
</template>

<script>
import PostContent from './PostContent.vue';
import PostFooter from './PostFooter.vue';
import PostAction from './PostAction.vue';
export default {
    components: { PostContent, PostFooter, PostAction }
}
</script>

<style>

</style>