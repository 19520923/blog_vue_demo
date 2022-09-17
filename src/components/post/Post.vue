<template>
    <div class="card card-post">

        <div class="card__title">
            <div>
                <img class="avatar-cg large" :src="post.author.avatar_url"
                    alt="avatar" />
                <div>
                    <h6>{{post.author.name}}</h6>
                    <span>{{formatedTime(post.created_at)}}</span>
                </div>
            </div>

            <div class='btn-icon btn-icon-exit'>
                <i class='fas fa-ellipsis-v'></i>
            </div>
        </div>

        <div class="card__content">
            <PostContent :content = "post.content" :image="post.photos[0]"/>
        </div>

        <div class="card__footer">
            <PostFooter :num_comment="post.num_comment" :num_like="post.reactions.length"/>
        </div>

        <div class='card__actions'>
            <PostAction :post="post"/>
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
import moment from 'moment'
export default {
    props: {
        post: Object
    },
    components: { PostContent, PostFooter, PostAction },
    methods: {
        formatedTime(datetime) {
            return moment().fromNow(datetime)
        }
    }
}
</script>