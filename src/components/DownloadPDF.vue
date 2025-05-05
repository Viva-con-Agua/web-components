<template>
    <div>
        <a target="_blank" :href="props.downloadLink">
            <div class="downloadLink">
                <img :src="props.displayImage" height="310" />
                <img :src="imgUrl" class="downloadLabel" />
            </div>
        </a>
    </div>
</template>
<script setup lang="ts">
    import imgUrl from '../assets/img/Download_Symbol.png';
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
        background-color: white;
        font-size: 30px;
        text-decoration: none;
        font-family: 'roboto_slab';
        font-style: normal;
        letter-spacing: 0px;
        line-height: 20px;
        color: $primary-dark;
        box-sizing: border-box;
        font-weight: 700;
        overflow: hidden;
        border-radius: 50%;
    }
</style>
