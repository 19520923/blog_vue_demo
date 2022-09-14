<template>
    <div class='form-cg'>
        <div class="form-cg__content">
            <h2>Welcome, Loggin now!</h2>
        </div>
        <div class="input-cg">
            <input type='text' name='email' v-model="data.email" required placeholder=" " />
            <label htmlFor="email">
                <span>
                    Email Address
                </span>
            </label>
        </div>
        <div class="input-cg">
            <input placeholder=' ' name="password" type="password" v-model="data.password" required />
            <label htmlFor="password">
                <span>
                    Password
                </span>
            </label>
        </div>
        <button class='btn btn-default' v-on:click="onSubmit">
            {{isLoggedIn? 'Loading...' : 'Login'}}
        </button>
    </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { useUserStore } from '../../../store/user'

export default {
    setup() {
        const store = useUserStore()
        return { isLoggedIn: computed(() => store.isLoggedIn), login: store.login }
    },
    data() {
        return {
            data: {
                email: '',
                password: ''
            },
            loading: false,
        }
    },
    methods: {
        onSubmit() {
            this.loading = true
            this.login(this.data, this.$router)
        }
    }
}
</script>
