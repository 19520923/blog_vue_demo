<template>
    <div class="btn-icon btn-icon-default" @click="this.handleImageClick">
        <i class='fas fa-file-image'></i>
    </div>
</template>

<script>
export default {
    props: ['handleImageClick'],
}
</script>
