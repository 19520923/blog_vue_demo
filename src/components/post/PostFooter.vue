<template>
    <div>
        <div class="footer-left">
            <i class='fas fa-thumbs-up'></i>
            <!-- {filterLike().length === 0 ? -->
            <span>
                Give the first like
            </span>
            <!-- <span>
                <span>{filterLike()[0].name} {filterLike().length > 1 && `and ${filterLike().length - 1} other
                    people`}</span>
            </span>
            } -->
        </div>
        <div class="footer-right">
            <span>
                No comments
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
    components: { LikePost }
}
</script>
