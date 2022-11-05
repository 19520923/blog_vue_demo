<template>
    <div class="comment">
        <Avatar size="large" :user="this.comment.author"/>
        <div class='comment__body-wrapper'>
            <div class="comment__header">
                <span>
                    {{this.comment.author.name}}
                </span>
                <span>
                    {{formatedTime(this.comment.created_at)}}
                </span>
            </div>
            <span>
                {{this.comment.content}}
            </span>
        </div>
    </div>

</template>

<script>
import moment from 'moment';
import Avatar from '../avatar/Avatar.vue';

export default {
    props: ["comment"],
    methods: {
        formatedTime(datetime) {
            return moment(datetime).fromNow();
        }
    },
    components: { Avatar }
}
</script>
