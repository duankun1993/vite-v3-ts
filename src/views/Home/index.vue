<template>
    <div v-opacityEnter>
        <h1>Home</h1>
        <SvgIcon class="svg" :src="svg" />
        <a-button type="primary" @click="handleToUser">Primary Button</a-button>
        <a-button type="primary" @click="handleDeposit">Deposit</a-button>
        <!-- <img v-path2url="''" alt=""> -->
    </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue';
import { useRouter } from 'vue-router';
import { deposit_with_nibiru } from '@/libs/wallet/nibi';
import svg from '../../assets/icons/valid_type.svg';

const router = useRouter();
const handleToUser = () => {
    router.replace({name: 'user'});
};

const handleDeposit = async () => {
    await deposit_with_nibiru()
}
</script>

<style scoped>
.svg{
    color: skyblue;
}
</style>