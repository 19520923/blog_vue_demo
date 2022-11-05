<template>
    <div class="right-side">
        <div class='right-side__wrapper'>
            <div>
                <h6>
                    Active friends
                </h6>
                <div>
                    <div class="btn-icon btn-icon-default">
                        <i class="fas fa-video"></i>
                    </div>
                    <div class="btn-icon btn-icon-default">
                        <i class="fas fa-search"></i>
                    </div>
                    <div class="btn-icon btn-icon-default">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            </div>

            <ul class="body">
                <li v-for="friend in getFriend()" :key="friend._id" class="body__item body__item--active">
                    <Avatar size="large" :user="friend" />
                    <span>
                        {{friend.name}}
                    </span>

                    <span v-if="friend.is_current" class='avatar-cg xxsmall active-bg'></span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Avatar from '../avatar/Avatar.vue';

export default {
    props: ["user"],
    methods: {
        getFriend() {
            return [...this.user.following, ...this.user.follower];
        }
    },
    components: { Avatar }
}
</script>

<style scoped>
.active-bg {
    background: green;
    position: absolute;
    right: 2em
}
</style>