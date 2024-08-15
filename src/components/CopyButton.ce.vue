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
        countdown: number | undefined;
        color: string | undefined;
    }>();
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
        }
        return '';
    });
</script>
<style lang="scss">
    @import '../styles/';

    .Button {
        @include fontStyleBodytext();

        height: 60px;
        appearance: none;
        border: none;
        padding: 20px;
        cursor: pointer;
        display: flex;
        gap: 10px;
        width: 100%;
        transition: background-color 0.2s ease-out;
        align-items: center;
        justify-content: center;
        color: $white;

        box-sizing: border-box;
        border-radius: 15px;

        position: relative;
        font-weight: 700;
        overflow: hidden;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        flex-wrap: nowrap;

        @include md {
            display: inline-flex;
            width: auto;
        }
    }
    .Button--solid {
        border: 1px solid transparent;
        background-color: $main-color;
        transition: all 0.2s ease-out;
        &:not(.Button--isLoading):not(.Button--disabled) {
            &:hover,
            &:active {
                transform: scale(1.2);
            }
        }
    }
    .bg-orange {
        background-color: $arts-primary;
    }
    .bg-dark {
        background-color: $primary-dark;
    }
    .Button__label {
        position: relative;
        z-index: 1;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        display: flex;
    }
</style>
