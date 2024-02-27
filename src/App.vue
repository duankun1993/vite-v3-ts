
<template>
    <router-view v-slot="{ Component }">
        <component :is="Component" />
    </router-view>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router';
</script>
<style lang="scss" scoped>
div{
    font-size: 12rem;
}
</style>