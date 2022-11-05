<template>
  <div class = 'profile-header'>
            <div class="cover-pic">
                <div class="cover-pic__wrapper">
                    <img :src="this.user.cover_url" alt=""/>
                </div>
            </div>

            <div class = 'avatar-header'>
                <div>
                    <div class = 'avatar-header__img'>
                        <img :src="this.user.avatar_url" alt="" class = 'avatar-cg xxxlarge'/>
                    </div>

                    <div>
                        <h1>
                            {{user.name}}
                        </h1>
                        <span>
                            {{user.followers && user.followers.length}} friends
                        </span>
                    </div>
                </div>    
            </div>
        </div>
</template>

<script>
export default {
    props: ["user"]
}
</script>