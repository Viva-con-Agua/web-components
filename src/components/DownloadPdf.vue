<template>
    <div>
        <a target="_blank" :href="props.downloadLink">
            <div class="downloadLink">
                <img :src="props.displayImage" height="310" />
                <img :src="imgURL" class="downloadLabel" />
            </div>
        </a>
    </div>
</template>
<script setup lang="ts">
    import imgUrl from '@/assets/img/Download_Symbol.png';
    const props = defineProps<{
        downloadLink: string;
        displayImage: string;
    }>();
    const imgURLPrefix = import.meta.env.VCA_PUBLIC_BASE_URL
        ? import.meta.env.VCA_PUBLIC_BASE_URL
        : '';
    const imgURL = imgURLPrefix + imgUrl;

    // PDF URL, die hier festgelegt wird (kann auch als Prop übergeben werden)
    //const pdfUrl: string = props.downloadLink;

    // Referenz auf das Canvas-Element
</script>
<style lang="scss">
    @import 'DownloadPdf.scss';
</style>
