<template>
    <div class='preview-image'>
        <img :src="previewImage" alt="" />
        <div class='btn-icon btn-icon-exit' @click='removeFileImage'>
            <i class='fas fa-times'></i>
        </div>
    </div>
</template>

<script>
export default {
    props: ['previewImage', 'removeFileImage'],
}
</script>
