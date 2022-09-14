<template>
    <div class='header'>
        <div class="header__wrapper side">
            <router-link class="link" to='/home'>
                <i class="icon-cg md fab fa-facebook"></i>
            </router-link>
            <div class="header__search">
                <!-- <SearchFriends/>                     -->
            </div>
        </div>
        <div class="header__wrapper">
            <router-link class="link" to='/home'>
                <div v-bind:class="getClass('home')">
                    <i class="fas fa-home"></i>
                    <div className='badge'>
                        <span>
                            9
                        </span>
                    </div>
                </div>
            </router-link>
            <router-link class="link" to='/friends'>
                <div v-bind:class="getClass('friends')">
                    <i class="fas fa-user-friends"></i>
                    <div className='badge'>
                        <span>
                            9
                        </span>
                    </div>
                </div>
            </router-link>
            <router-link class="link" to='/watch'>
                <div v-bind:class="getClass('watch')">
                    <i class="fas fa-tv"></i>
                    <div className='badge'>
                        <span>
                            9
                        </span>
                    </div>
                </div>
            </router-link>
            <router-link class="link" to='/market'>
                <div v-bind:class="getClass('market')">
                    <i class="fas fa-store"></i>
                    <div className='badge'>
                        <span>
                            9
                        </span>
                    </div>
                </div>
            </router-link>
            <router-link class="link" to='/groups'>
                <div class='btn-nav btn-nav-default'>
                    <i class="fas fa-users"></i>
                    <div class='badge'>
                        <span>
                            9
                        </span>
                    </div>
                </div>
            </router-link>
        </div>
        <div class="header__wrapper side">
            <router-link class="link" to="/home">
                <div class='header__avatar'>
                    <img :src="user.avatar_url" class="avatar-cg large" alt='avatar' />
                    <span>
                        {{user.name}}
                    </span>
                </div>
            </router-link>
            <!-- <div class='btn-icon btn-icon-default'>
                <i class="fab fa-facebook-messenger"></i>
                <div class='badge'>
                    <span>
                        9
                    </span>
                </div>
            </div> -->

            <NotificationMenu :notifications="noti"/>

            <div class='btn-icon btn-icon-default'>
                <i class="fas fa-caret-down"></i>
            </div>
        </div>
    </div>
</template>

<script>
import NotificationMenu from '../notification/NotificationMenu.vue';
export default {
    props: {
        user: {
            type: Object,
            required: true,
            default: {
                name: "Nguyen Nhut tan",
                avatar_url: "@/assets/background.jpg"
            }
        },
        noti: Array
    },
    methods: {
        getClass(property) {
            return {
                "btn-nav btn-nav-default is-active": this.$route.name === property,
                "btn-nav btn-nav-default": this.$route.name !== property
            };
        }
    },
    components: { NotificationMenu }
}
</script>
