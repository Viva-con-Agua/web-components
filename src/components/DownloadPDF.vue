<template>
    <div>
        <a target="_blank" :href="props.downloadLink">
            <div class="downloadLink">
                <img :src="props.displayImage" height="310" />
                <div class="downloadLabel">⤓</div>
            </div>
        </a>
    </div>
</template>
<script setup lang="ts">
    const props = defineProps<{
        downloadLink: string;
        displayImage: string;
    }>();

    // PDF URL, die hier festgelegt wird (kann auch als Prop übergeben werden)
    //const pdfUrl: string = props.downloadLink;

    // Referenz auf das Canvas-Element
</script>
<style lang="scss">
    @import '../styles/';
    .downloadLink {
        position: relative;
        text-align: center;
    }
    .downloadLabel {
        position: absolute;
        top: 80%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: 2px solid transparent;
        background-color: white;
        font-size: 32px;
        text-decoration: none;
        font-family: 'roboto_slab';
        font-style: normal;
        letter-spacing: 0px;
        line-height: 24px;
        color: $primary-dark;
        box-sizing: border-box;
        border-radius: 15px;
        font-weight: 700;
        overflow: hidden;
        border-radius: 50%;
        border-color: $primary-dark;
        padding-left: 24px;
        padding-right: 24px;
        padding-top: 16px;
        padding-bottom: 16px;
    }
</style>
