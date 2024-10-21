<template>
    <iframe
        @load="messageThatIframeIsLoaded"
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
            if (event.data.event === 'tracking-trigger' || event.data.event === 'gtm-trigger') {
                window.dataLayer?.push(event.data.data);
                if (event.data.data.category === undefined) {
                    event.data.data.category =
                        'donation ' + event.data.data.donation_customer_type
                            ? event.data.data.donation_customer_type
                            : '';
                    event.data.data.action =
                        event.data.data.donation_value +
                        ' ' +
                        event.data.data.currency +
                        ' ' +
                        event.data.data.donation_interval +
                        ' ' +
                        event.data.data.donation_per_year;
                    event.data.data.name = event.data.data.event;
                    event.data.data.value = event.data.data.yearly_donation_value;
                }
                window._mtm?.push(event.data.data);
            }
        }
    };
    const messageThatIframeIsLoaded = () => {
        // eslint-disable-next-line
        console.log('Iframe on load');
        if (iframeElement.value) {
            iframeElement.value.contentWindow?.postMessage({ type: 'iframe-loaded' }, '*');
        }
    };
    const iframeHeight = computed(() => {
        return 'height: ' + height.value;
    });
    onBeforeMount(() => {
        parent.addEventListener('message', handleIframeMessage, false);
    });
</script>
