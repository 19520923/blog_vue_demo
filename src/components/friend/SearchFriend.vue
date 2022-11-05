<template>
    <div :class="this.getClass()" id='search' v-click-out-side="clickOutside">
        <div class="input-placeholder">
            <input id='search-input' type="text" placeholder="Find your friends ..." v-model="this.text"
                @focus="this.isOpen = true" />
        </div>
        <div v-if="this.isOpen&&this.loading" class='search-friends__body'>Loading...</div>
        <div v-if="this.isOpen" class='search-friends__body'>
            <ul>
                <li v-for="friend in this.friends" :key="friend._id" @click="handleClick(friend)">
                    <img :src="friend.avatar_url" :alt="friend.name" class='avatar-cg large' />
                    <div class="item-body">
                        <span>{{friend.name}}</span>
                        <span>{{friend.email}}</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { useUserStore } from '@/store/user'
import { computed } from '@vue/reactivity'
import clickOutSide from "@mahdikhashan/vue3-click-outside";

export default {
    setup() {
        const userStore = useUserStore()
        return { friends: computed(() => userStore.search), search: userStore.searchFriend, setCurrentUser: userStore.setCurrentUser }
    },
    directives: {
        clickOutSide,
    },
    data() {
        return {
            text: '',
            isOpen: false,
            loading: false,
        }
    },
    watch: {
        text(newValue) {
            this.search(newValue)
        }
    },
    methods: {
        clickOutside() {
            this.isOpen = false
        },
        getClass() {
            return {
                "card-cg": !this.isOpen,
                "card-cg active": this.isOpen
            }
        },
        handleClick(user){
            this.setCurrentUser(user)
            this.$router.push({name: "profile", params: {user_id: user._id}})
        }
    }
}
</script>
