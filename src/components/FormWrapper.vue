<template>
    <iframe
        v-if="loaded"
        @load="messageThatIframeIsLoaded"
        id="iframeElement"
        ref="iframeElement"
        :src="src"
        style="width: 100%; border: none"
        :style="[iframeHeight, bordered]"></iframe>
</template>
<script setup lang="ts">
    import { computed } from 'vue';
    import { onBeforeMount } from 'vue';
    import { Ref } from 'vue';
    import { ref } from 'vue';

    const props = defineProps<{
        src: string;
        bordered: boolean | undefined;
    }>();
    const loaded = ref(false);
    const src = ref(props.src);
    const height = ref('1000px');
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
            if (event.data.type === 'payment-done') {
                const url = new URL(window.location.href);
                url.searchParams.delete('payment_id');
                url.searchParams.delete('redirect_status');
                url.searchParams.delete('payment_intent');
                url.searchParams.delete('payment_intent_client_secret');
                window.history.replaceState(null, '', url);
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
    const bordered = computed(() => {
        if (props.bordered) {
            return 'width: 99%; border: 4px solid #ff6900;';
        }
        return '';
    });

    const handleSrc = () => {
        const url = new URL(src.value);
        url.searchParams.append('location', window.location.href);
        src.value = url.toString();
    };

    const handleTwintQuery = () => {
        const queryParams = new URL(window.location.href).searchParams;
        const payment_id = queryParams.get('payment_id');
        const payment_intent = queryParams.get('payment_intent');
        const redirect_status = queryParams.get('redirect_status');
        const url = new URL(src.value);
        if (payment_id !== null) {
            url.searchParams.append('payment_id', payment_id);
        }
        if (payment_intent !== null) {
            url.searchParams.append('payment_intent', payment_intent);
        }
        if (redirect_status !== null) {
            url.searchParams.append('redirect_status', redirect_status);
        }
        src.value = url.toString();
    };
    onBeforeMount(() => {
        parent.addEventListener('message', handleIframeMessage, false);
        handleSrc();
        handleTwintQuery();
        loaded.value = true;
    });
</script>
