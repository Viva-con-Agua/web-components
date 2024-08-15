<template>
    <Button @click="submit">{{ label }}</Button>
</template>
<script setup lang="ts">
    import { Button } from '@vivaconagua/vueca';
    import { ref, watch } from 'vue';
    const props = defineProps<{
        label: string;
        copy_label: string;
        copy_value: string;
        countdown: number;
    }>();
    const label = ref(JSON.parse(JSON.stringify(props.label)));
    const submit = () => {
        navigator.clipboard.writeText(props.copy_value);
        label.value = JSON.parse(JSON.stringify(props.copy_label));
        const interval = setInterval(() => {
            if (timer.value == 0) {
                clearInterval(interval);
            } else {
                timer.value--;
            }
        }, 1000);
    };
    const timer = ref(JSON.parse(JSON.stringify(props.countdown)));
    const reset = () => {
        timer.value = JSON.parse(JSON.stringify(props.countdown));
        label.value = JSON.parse(JSON.stringify(props.label));
    };
    watch(
        () => timer.value,
        () => {
            if (timer.value == 0) {
                reset();
            }
        }
    );
</script>
