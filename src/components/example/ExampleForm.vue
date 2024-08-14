<template>
    <Column class="gap-4">
        <Card :bordered="true">
            <Headline type="h4">{{ $t('example.general.label') }}</Headline>
            <p>{{ $t('example.general.description') }}</p>
            <Row>
                <TextField
                    :label="$t('example.name.label')"
                    :rules="v$.data.name"
                    ref="name"
                    v-model="data.name" />
            </Row>
        </Card>
        <FormField>
            <Button @click="doEmit">
                {{ $t('button.save') }}
            </Button>
        </FormField>
    </Column>
</template>

<script lang="ts" setup>
    import { useExampleStore } from '@/stores/ExampleStore';
    import { Example } from '@/types/Example';

    import { Column, Row, Card, TextField, Headline, Button, FormField } from '@vivaconagua/vueca';
    import useVuelidate from '@vuelidate/core';

    import { ref, watch } from 'vue';
    const store = useExampleStore();
    interface Props {
        modelValue: Example;
        isEdit: boolean;
    }

    const props = withDefaults(defineProps<Props>(), {
        isEdit: false,
    });

    const emit = defineEmits(['submit']);
    const doEmit = () => {
        if (v$.value.data.$invalid) {
            validate();
        } else {
            emit('submit', data);
        }
    };
    const data = ref(props.modelValue);

    const name = ref();

    const validate = () => {
        name.value.validate();
    };
    watch(
        () => props.modelValue,
        (value) => {
            data.value = ref(value).value;
        }
    );
    const validations = () => {
        return store.validations;
    };
    const v$ = useVuelidate(validations(), { data });
</script>
