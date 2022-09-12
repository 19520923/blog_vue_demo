<template>
  <div class = 'auth'>
            <div class="auth__content">
                 <h1>Logging to account</h1>
            </div>
            <div class="auth__container">
                <Login />
                <!-- <button class="btn-icon btn-icon-primary" onClick = {()=> setIsLogin(!isLogin)}>
                    <i class = {isLogin ? 'fas fa-arrow-right' : 'fas fa-arrow-left'}></i>
                </button> -->
            </div>
        </div>
</template>

<script>
import Login from '@/components/auth/login/index.vue';
export default {
    components: { Login }
}
</script>
