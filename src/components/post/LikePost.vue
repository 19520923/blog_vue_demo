<template>
    <div :class="getClass()" @click="likeUnLike">
        <i class='fas fa-thumbs-up'></i>
        <span>
            Like
        </span>
    </div>

</template>

<script>
import { usePostStore } from '@/store/post';
import { useUserStore } from '@/store/user';
import { computed } from '@vue/reactivity';

export default {
    setup() {
        const store = useUserStore()
        const post = usePostStore()
        return { user: computed(() => store.user), like: post.like, unLike: post.unLike }
    },
    props: {
        post: Object
    },
    methods: {
        getLiked() {
            return this.post.reactions.includes(this.user._id)
        },
        getClass() {
            return {
                'btn btn-white is-active': this.getLiked(),
                'btn btn-white': !this.getLiked()
            }
        },
        likeUnLike() {
            if (!this.getLiked())
                this.like(this.post._id, this.user._id)
            else this.unLike(this.post._id, this.user._id)
        }
    }
}
</script>