<template>
    <div class='card card-post'>
        <div class='card__footer'>
            <div class='footer-left'>
                <img class='avatar-cg large' :src="this.user.avatar_url" alt="" />

                <p> Write somethings, {{this.user.name}}</p>

            </div>
            <div class='btn-icon btn-icon-default' @click="handleOpenDialog">
                <i class='fas fa-plus'></i>
            </div>
            <div v-if="this.isOpen" class='dialog'>
                <div class="card">
                    <div class="card__title">
                        <img v-if="user.avatar_url" class='avatar-cg large' :src="user.avatar_url" alt="" />
                        <h6>Create post</h6>
                        <div class='btn-icon btn-icon-exit' @click="onClose">
                            <i class='fas fa-times'></i>
                        </div>
                    </div>
                    <div class="card__content">
                        <select class='select select-primary' v-model="this.post.is_public">
                            <option value="false">&#xf508; Only me</option>
                            <option value="true">&#xf57d; Public</option>
                        </select>

                        <div class='text-area'>
                            <textarea cols="60" :rows="this.post.content.length / 60 + 1"
                                placeholder='Now, write something' v-model='this.post.content' />
                        </div>

                        <div v-if="this.previewImage.length > 0" class='form-post__preview-image'>
                            <div class='preview-image'>
                                <img ref="image" :src="this.previewImage" alt="" />
                                <div class='btn-icon btn-icon-exit' @click='removeFileImage'>
                                    <i class='fas fa-times'></i>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class='card__footer'>
                        <div class='footer-left'>
                            <FileField :handleImageClick="handleImageClick" />
                        </div>
                        <div class='footer-right'>
                            <button class='btn btn-default' @click='handleSubmitPost'>
                                Loading
                            </button>
                            <input ref="input" type="file" @change="onFileChanged" accept='image/*' capture />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import { usePostStore } from '@/store/post';
import { useUserStore } from '@/store/user';
import { computed } from '@vue/reactivity';
import FileField from './FileField.vue';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/firebase/firebase"

export default {
    setup() {
        const userStore = useUserStore()
        const postStore = usePostStore()
        return {
            user: computed(() => userStore.user),
            createPost: postStore.create
        }
    },

    data() {
        return {
            post: {
                is_public: true,
                content: "",
                image: '',
            },
            previewImage: '',
            isOpen: false
        }
    },

    methods: {
        removeFileImage() {
            this.previewImage = false
        },

        async handleSubmitPost() {
            if (this.previewImage) {
                const metadata = {
                    contentType: "image/jpeg",
                };

                const filename = `post/post-${Date.now()}`
                const imageRef = ref(storage, `images/${filename}`)

                uploadBytesResumable(imageRef, this.post.image, metadata).then((snapshot) => {
                    getDownloadURL(snapshot.ref).then((downloadURL) => {
                        this.createPost({
                            foods: [],
                            content: this.post.content,
                            photos: [downloadURL],
                            is_public: this.post.is_public
                        })
                    })
                })

            } else {
                this.createPost({
                    foods: [],
                    content: this.post.content,
                    is_public: this.post.is_public
                })
            }

            this.isOpen = false
        },

        handleOpenDialog() {
            this.isOpen = true
        },

        onClose() {
            this.isOpen = false
        },

        handleImageClick() {
            this.$refs.input.click()
        },

        onFileChanged(event) {
            const target = event.target;
            const reader = new FileReader()
            if (target && target.files) {
                this.post.image = target.files[0]
                reader.readAsDataURL(target.files[0])
                reader.onload = (e) => {
                    this.previewImage = e.target.result
                }
            }
        },

        getImage() {
            return this.previewImage
        }
    },
    components: { FileField }
}
</script>