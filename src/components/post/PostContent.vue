<template>
    <div class='post-content__content'>
        <p>
            {{content}}
        </p>
    </div>

    <div class='post-content__image'>
        <img :src='image' alt='background' />
    </div>
</template>

<script>
export default {
    props: {
        content: String,
        image: String
    }
}
</script>

<style>

</style>