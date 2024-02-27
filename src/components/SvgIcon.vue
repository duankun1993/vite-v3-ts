<template>
    <div class="svg-icon" v-html="svgNode"></div>
</template>

<script setup lang="ts">
import { Ref, onMounted, ref } from 'vue';

const props = defineProps({
    src: {
        type: String,
        default: ''
    }
})

const svgNode: Ref<string> = ref('');

onMounted(async () => {
    try {
        const res = await fetch(props.src);

        let svgText: string = await res.text();
        // 修改SVG内容，例如更改颜色
        svgNode.value = svgText
            .replace(/fill=".*?"/g, 'fill="currentColor"')
            .replace(/width="(\d+)(px)?"/, 'width="1em"')
            .replace(/height="(\d+)(px)?"/, 'height="1em"');
    } catch (error) {
        console.error('Error loading the SVG:', error)
    }
})

</script>

<style scoped>
.svg-icon {
    /* Keep SVG aspect ratio */
    height: auto;
    /* Treat it like an image or icon */
    display: inline-block;
    margin: 0 0.25em;
    /* Inherit font size from parent */
    font-size: inherit;
    /* Inherit color from parent */
    color: inherit;
}
</style>