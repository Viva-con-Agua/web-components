<template>
    <Column class="gap-4">
        <Row>
            <div>
                <h3>{{ $t('example.general.label') }}</h3>
                <Row>
                    <div class="font-bold">{{ $t('example.name.label') }}</div>
                    <div>{{ data.name }}</div>
                </Row>
            </div>
        </Row>
    </Column>
</template>

<script lang="ts" setup>
    import { Example } from '@/types/Example';
    import { ref, watch } from 'vue';

    import { Column, Row } from '@vivaconagua/vueca';

    interface Props {
        modelValue: Example;
    }
    const props = defineProps<Props>();

    const data = ref(props.modelValue);
    watch(
        () => props.modelValue,
        (value) => {
            data.value = ref(value).value;
        }
    );
</script>
