<template>
    <Button :class="css" @click="submit">{{ labelShow }}</Button>
</template>
<script setup lang="ts">
    import { ColorType } from '@/types/Default';
    import { Button } from '@vivaconagua/vueca';
    import { computed, ref, watch } from 'vue';
    const props = defineProps<{
        label: string;
        copy_label: string;
        copy_value: string;
        countdown?: number | undefined;
        color?: string | undefined;
    }>();
    defineExpose();
    const labelShow = ref();
    labelShow.value = props.label;
    const submit = () => {
        navigator.clipboard.writeText(props.copy_value);
        labelShow.value = props.copy_label;
        timer.value = props.countdown ? props.countdown : 5;
        const interval = setInterval(() => {
            if (timer.value == 0) {
                clearInterval(interval);
            } else {
                timer.value--;
            }
        }, 1000);
    };
    const timer = ref();
    const reset = () => {
        labelShow.value = props.label;
    };
    watch(
        () => timer.value,
        () => {
            if (timer.value == 0) {
                reset();
            }
        }
    );
    const css = computed(() => {
        switch (props.color) {
            case ColorType.orange:
                return 'bg-orange';
            case ColorType.dark:
                return 'bg-dark';
            default:
                return '';
        }
    });
</script>
<style lang="scss">
    @import 'Button.scss';
</style>
