<template>
    <div>
        <select class='select select-primary' :value="post.privacy" onChange={handlePrivacyChange}>
            <option value="Only me">&#xf508; Only me</option>
            <option value="Public">&#xf57d; Public</option>
        </select>
    </div>

    <div class='text-area'>
        <textarea id="" cols="60" :rows="post.content.length / 60 + 1" placeholder='Now, write something'
            :value="post.content" onChange={handleContentChange} />
    </div>

    <div v-if="previewImage" class='form-post__preview-image'>
        <PreviewImage :previewImage="previewImage" :removeFileImage="removeFileImage" />
    </div>

    <div class='card__footer'>
        <div class='footer-left'>
            <FileField fileRef={fileRef} />
        </div>
        <div class='footer-right'>
            <button class='btn btn-default' onClick={handleSubmitPost} disabled={loading}>
                {loading? 'Loading' : 'Create Post'}
            </button>

            <input type="file" ref={fileRef} onChange={handleImageChange} accept='image/*' capture='user' />
        </div>
    </div>

</template>

<script>
import { ref } from 'vue';
import FileField from './FileField.vue';
import PreviewImage from './PreviewImage.vue';
export default {
    setup(){
        const file = ref();

        function onFileChanged($event) {
            
        }

        async function saveImage() {
            if (file.value) {
                try {
                // save file.value
                } catch (error) {
                    console.error(error);
                    form.value?.reset();
                    file.value = null;
                } finally {
                }
            }
        };

        return {
            saveImage,
            onFileChanged,
        }
    },
    data(){
        return {
            post: {
                privacy: {
                    type: String,
                    default: 'Public'
                },
                content: {
                    type: String,
                    default: ''
                }

            },
            previewImage: any,

        }
    },
    methods: {
        removeFileImage(){

        }
    },
    components: { FileField, PreviewImage }
}
</script>

<style>

</style>