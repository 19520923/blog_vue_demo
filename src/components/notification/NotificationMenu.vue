<template>
    <div class='header__notification' v-click-out-side="clickOutside">
        <div :class="getClass()" data-c-tooltip='Notifications' tooltip-position='bottom'
            @click="clickInside">
            <i class="fa-solid fa-bell"></i>
            <div v-if="this.unSeen.length !== 0" class='badge'>
                <span>
                    {{this.unSeen().length}}
                </span>
            </div>
        </div>
        <div   v-if="open" class="card-cg">

            <i v-if="notifications.length===0" class='fas fa-comment-slash'></i>

            <ul v-else>
                <li v-for="notification in notifications" :key="notification._id">
                    <Avatar size="xlarge" :user="notification.author"/>
                    <div class="item-body">
                        <span>
                            {{notification.content}}
                        </span>
                        <span>{{formatedTime(notification.created_at)}}</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import clickOutSide from "@mahdikhashan/vue3-click-outside";
import Avatar from '../avatar/Avatar.vue';

export default {
    props: {
        notifications: Array
    },
    directives: {
        clickOutSide,
    },
    data() {
        return {
            open: false
        };
    },
    methods: {
        formatedTime(datetime) {
            return moment(datetime).fromNow();
        },
        getClass() {
            return {
                "btn-icon btn-icon-default is-active": this.open,
                "btn-icon btn-icon-default": !this.open
            };
        },
        clickOutside() {
            this.open = false;
        },
        clickInside() {
            this.open = !this.open;
        },
        unSeen() {
            return this.notifications.filter(n => n.is_seen === false);
        }
    },
    components: { Avatar }
}
</script>
