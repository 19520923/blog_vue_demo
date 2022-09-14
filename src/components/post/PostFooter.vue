<template>
    <div>
        <div class="footer-left">
            <i class='fas fa-thumbs-up'></i>
            <span>
                {{getNumLike()}}
            </span>
        </div>
        <div class="footer-right">
            <span>
                {{`${num_comment} comments`}}
            </span>
            <span>
                No shares
            </span>
        </div>
    </div>
</template>

<script>
import LikePost from "./LikePost.vue";
export default {
    props: {
        num_comment: Number,
        num_like: Number
    },
    components: { LikePost },
    methods: {
        getNumLike() {
            return this.num_like === 0 && this.num_like ? 'Give first like' : this.num_like 
        }
    }
}
</script>
