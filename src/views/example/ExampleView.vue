<template>
    <ExampleList></ExampleList>
    <Popup
        :show="store.current.id"
        @close="closeCurrent"
        v-if="store.doEdit"
        :title="$t('context_button.edit', [$t('example.context')])">
        <ExampleForm @submit="saveCurrent" isEdit v-model="store.current" />
    </Popup>
    <Popup
        :show="store.doCreate"
        @close="closeCreate"
        v-if="store.doCreate"
        :title="$t('context_button.add', [$t('example.context')])">
        <ExampleForm @submit="saveCreate" v-model="store.create" />
    </Popup>
    <Popup
        :show="store.current.id"
        @close="closeCurrent"
        v-if="store.doView"
        :title="$t('context_button.view', [$t('example.context')])">
        <ExampleDisplay v-model="store.current" />
        <Card class="py-4 text-center">
            <Button @click="deleteCurrent" size="small" type="cancel">{{
                $t('context_button.delete', [$t('example.context')])
            }}</Button>
        </Card>
    </Popup>
</template>
<script setup lang="ts">
    import { Popup, Button, Card } from '@vivaconagua/vueca';
    import ExampleList from '@/components/example/ExampleList.vue';
    import ExampleForm from '@/components/example/ExampleForm.vue';
    import ExampleDisplay from '@/components/example/ExampleDisplay.vue';
    import { useExampleStore } from '@/stores/ExampleStore';
    import { Example } from '@/types/Example';
    import { onBeforeMount } from 'vue';
    import { useI18n } from 'vue-i18n';
    const { t } = useI18n();
    const store = useExampleStore();
    onBeforeMount(() => {
        store.getList();
    });

    const closeCurrent = () => {
        store.doEdit = false;
        store.doView = false;
        store.edit = {} as Example;
        store.resetCurrent();
    };
    const saveCurrent = () => {
        if (!confirm(t('example.confirm.update'))) {
            return;
        }
        store.update().then(() => {
            closeCurrent();
        });
    };
    const closeCreate = () => {
        store.doCreate = false;
    };
    const deleteCurrent = () => {
        if (!confirm(t('example.confirm.delete'))) {
            return;
        }
        store.delete().then(() => {
            closeCurrent();
        });
    };
    const saveCreate = () => {
        if (!confirm(t('example.confirm.add'))) {
            return;
        }
        store.add().then(() => {
            store.doCreate = false;
            store.resetCreate();
        });
    };
</script>
