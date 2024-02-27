<template>
    <div v-opacityEnter>
        <h1 class="title">
            <span>
                {{ user.name }}
            </span>
        </h1>
        
        <img :src="user.getAvatar" alt="avatar" />
        <a-button type="primary" @click="handleToHome">To Home</a-button>
    </div>
</template>

<script setup lang="ts">
import useStore from "@/store/modules/user";
import { useRouter } from "vue-router";
// import { register } from "@/api/user/user";
// register('jack','699');
const user = useStore();
const router = useRouter();

const handleToHome = () => {
    router.replace({name: 'home'})
}


</script>

<style scoped lang="scss">
.title{
    font-size: 18rem;
    span{
        // 字体红色
        color: red;
    }
}
</style>