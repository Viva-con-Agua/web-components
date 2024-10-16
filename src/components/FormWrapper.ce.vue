<template>
    <iframe
        id="iframeElement"
        ref="iframeElement"
        :src="props.src"
        style="width: 100%; border: none"
        :style="iframeHeight"></iframe>
</template>
<script setup lang="ts">
    import { computed } from 'vue';
    import { onBeforeMount } from 'vue';
    import { Ref } from 'vue';
    import { ref } from 'vue';

    const props = defineProps<{
        src: string;
    }>();
    const height = ref('0px');
    const iframeElement: Ref<HTMLIFrameElement | null> = ref(null);
    const handleIframeMessage = (event: any) => {
        if (event.source === iframeElement.value?.contentWindow) {
            if (event.data.type === 'iframe-height') {
                height.value = event.data.data.height + 'px';
            }
            if (event.data.type === 'scroll-top') {
                const top = iframeElement.value ? iframeElement.value.offsetTop : 0;
                window.scrollTo(0, top);
            }
            if (event.data.event === 'tracking-trigger') {
                window.dataLayer?.push(event.data.data);
                window._mtm.push(event.data.data);
            }
        }
    };
    const iframeHeight = computed(() => {
        return 'height: ' + height.value;
    });
    onBeforeMount(() => {
        parent.addEventListener('message', handleIframeMessage, false);
    });
</script>
