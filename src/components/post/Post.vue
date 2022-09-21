<template>
    <div class="card card-post">
        <div class="card__title">
            <div>
                <Avatar size="large" :user="this.post.author"/>
                <div>
                    <h6>{{post.author.name}}</h6>
                    <span>{{formatedTime(post.created_at)}}</span>
                </div>
            </div>

            <div v-if="!isFollowing" class='btn-icon btn-icon-exit'>
                <span>
                    Follow
                </span>
            </div>
        </div>

        <div class="card__content">
            <PostContent :content="post.content" :image="post.photos[0]" />
        </div>

        <div class="card__footer">
            <PostFooter :num_comment="post.num_comment" :num_like="post.reactions.length" />
        </div>

        <div class='card__actions'>
            <PostAction :post="this.post" :openComment="openComment" />
        </div>

        <div class='card__comments' v-if="this.isCommentOpen">
            <div v-if="this.comments[this.getCommentsIndex()]&&this.comments[this.getCommentsIndex()].rows">
                <Comment v-for="comment in this.comments[this.getCommentsIndex()].rows" :key="comment._id"
                    :comment="comment" />
            </div>
            <ComentText :post="this.post"/>
        </div>
    </div>
</template>

<script>
import PostContent from './PostContent.vue';
import PostFooter from './PostFooter.vue';
import PostAction from './PostAction.vue';
import moment from 'moment'
import { usePostStore } from '@/store/post';
import Comment from '../comment/Comment.vue';
import { computed } from '@vue/reactivity';
import ComentText from '../comment/ComentText.vue';
import Avatar from '../avatar/Avatar.vue';
import { useUserStore } from '@/store/user';
export default {
    setup() {
        const postStore = usePostStore()
        const userStore = useUserStore()

        return {
            comments: computed(() => postStore.comments),
            setComments: postStore.setComments,
            user: computed(()=> userStore.user)
        }
    },
    data() {
        return {
            isCommentOpen: false
        }
    },
    props: {
        post: Object
    },
    components: { PostContent, PostFooter, PostAction, Comment, ComentText, Avatar },
    methods: {
        formatedTime(datetime) {
            return moment(datetime).fromNow()
        },

        getCommentsIndex() {
            return this.comments.findIndex(c => c.post === this.post._id)
        },

        openComment() {
            this.isCommentOpen = !this.isCommentOpen
            if (this.isCommentOpen) {
                this.setComments(this.post._id)
            }
        },
        isFollowing(){
            const index = this.user.following.findIndex(f => f._id === this.post.author._id)
            return index !== -1 || this.user._id === this.post.author._id
        }
    }
}
</script>