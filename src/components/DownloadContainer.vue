<template>
    <div class="downloadContainer">
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
    // PDF URL, die hier festgelegt wird (kann auch als Prop übergeben werden)
    //const pdfUrl: string = props.downloadLink;

    // Referenz auf das Canvas-Element
</script>
<style lang="scss">
    .downloadContainer {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5em;
        align-content: center;
        justify-content: center;
    }
</style>
