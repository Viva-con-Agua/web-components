<template>
    <Button :class="css" @click="submit">{{ label }}</Button>
</template>
<script setup lang="ts">
    import { ColorType } from '@/types/Default';
    import { Button } from '@vivaconagua/vueca';
    import { computed } from 'vue';
    const props = defineProps<{
        label: string;
        to: string;
        utm_source: string | undefined;
        utm_medium: string | undefined;
        utm_campaign: string | undefined;
        color: string | undefined;
    }>();
    const submit = () => {
        window.location.href = props.to + campaign();
    };
    const campaign = () => {
        if (!props.utm_campaign && !props.utm_medium && !props.utm_source) {
            return '';
        } else {
            const query = [];
            if (props.utm_source) {
                query.push('utm_source=' + props.utm_source);
            }
            if (props.utm_medium) {
                query.push('utm_medium=' + props.utm_medium);
            }
            if (props.utm_campaign) {
                query.push('utm_campaign=' + props.utm_campaign);
            }
            let queryString = '?';
            query.forEach((e) => {
                queryString = queryString + e + '&';
            });
            queryString = queryString.substring(0, queryString.length - 1);
            return queryString;
        }
    };
    const css = computed(() => {
        if (props.color != undefined) {
            if (props.color == ColorType.default) {
                return '';
            }
            if (props.color == ColorType.orange) {
                return 'bg-orange';
            }
            if (props.color == ColorType.dark) {
                return 'bg-dark';
            }
            if (props.color == ColorType.aguaPink) {
                return 'agua-pink';
            }
        }
        return '';
    });
</script>
<style lang="scss">
    @import 'Button.scss';
</style>
