<template>
    <div v-opacityEnter>
        <h1>Home</h1>
        <SvgIcon class="svg" :src="svg" />
        <a-button type="primary" @click="handleToUser">Primary Button</a-button>
        <!-- <img v-path2url="''" alt=""> -->
    </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue';
import { useRouter } from 'vue-router';
import svg from '../../assets/icons/valid_type.svg';

const router = useRouter();
const handleToUser = () => {
    router.replace({name: 'user'});
};
</script>

<style scoped>
.svg{
    color: skyblue;
}
</style>