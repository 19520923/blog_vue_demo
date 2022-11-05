<template>
  <div class = 'post-comment-textarea'>
            <img :src="this.user.avatar_url" alt="" class = "avatar-cg large"/>

            <div class = 'text-area'>
                    <textarea id="" :cols="55" :rows="commentText.length / 55 + 1" placeholder = 'Write a comment...'
                        v-model = "commentText"/>
                <div class = 'btn-icon btn-icon-default' @click="createComment">
                    <i class = 'fas fa-paper-plane'></i>
                </div>
            </div>

            
        </div>
</template>

<script>
import { usePostStore } from '@/store/post';
import { useUserStore } from '@/store/user';
import { computed } from '@vue/reactivity';

export default {
    setup(){
        const userStore = useUserStore()
        const postStore = usePostStore()
        return {user: computed(()=> userStore.user), create: postStore.createComment}
    }, 
    data(){
        return {commentText: '',}
    },
    props: ['post'],
    methods: {
        createComment(){
            this.create({
                post: this.post._id,
                content: this.commentText
            })
            this.commentText = ''
        }
    }
}
</script>
