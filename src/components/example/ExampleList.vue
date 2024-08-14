<template>
    <div class="px-2">
        <Headline type="h4">{{ $t('example.header') }}</Headline>
        <CustomTable :list="store.list" :labels="tableLabels" :pagination="pagination" colspan="3">
            <template v-slot:colspan>
                <col width="1%" />
                <col width="98%" />
                <col width="1%" />
            </template>
            <template v-slot:desktop-options>
                <div class="my-2">
                    <Button size="small" @click="setCreate()">
                        {{ $t('context_button.add', [$t('example.context')]) }}
                    </Button>
                </div>
            </template>
            <template v-slot:desktop-header>
                <th class="CustomTable__cell sortable" @click="pagination.sort('_id')">
                    <label> {{ $t('table.header.index') }} &varr;</label>
                </th>
                <th class="CustomTable__cell sortable" @click="pagination.sort('name')">
                    <label> {{ $t('table.header.name') }} &varr;</label>
                </th>
                <th class="CustomTable__cell">
                    <label> {{ $t('table.header.options') }} </label>
                </th>
            </template>
            <template v-slot:desktop-content>
                <tr
                    class="CustomTable__row"
                    :class="{ last: index + 1 == pagination.pageSize }"
                    v-for="(res, index) in getList"
                    :key="index">
                    <td class="CustomTable__cell">
                        <label> {{ index + 1 }} </label>
                    </td>
                    <td class="CustomTable__cell">
                        <label> {{ res.name }} </label>
                    </td>
                    <td class="CustomTable__cell CustomTable__cell__options">
                        <Row>
                            <div class="h-6 w-6">
                                <div class="h-6 w-6">
                                    <button @click="viewCurrent(res)">
                                        {{ t('table.options.view') }}
                                    </button>
                                </div>
                            </div>
                            <div class="h-6 w-6">
                                <button @click="setCurrent(res)">
                                    {{ t('table.options.edit') }}
                                </button>
                            </div>
                        </Row>
                    </td>
                </tr>
            </template>
        </CustomTable>
    </div>
</template>
<script setup lang="ts">
    import { useExampleStore } from '@/stores/ExampleStore';
    import { Example } from '@/types/Example';
    import { CustomTable, Row, Button, Headline, usePagination } from '@vivaconagua/vueca';
    import { watch, computed } from 'vue';
    import { useI18n } from 'vue-i18n';
    const store = useExampleStore();
    const pagination = usePagination();
    const { t } = useI18n();
    const tableLabels = computed(() => {
        return {
            search: t('table.search'),
            page_no_results: t('table.page.no_results'),
            page_label: t('table.page.label'),
            page_size: t('table.page.size'),
            page_first: t('table.page.first'),
            page_prev: t('table.page.back'),
            page_next: t('table.page.next'),
            page_last: t('table.page.last'),
        };
    });
    const emptyFilter = computed(() => {
        return pagination.state.search == '';
    });
    pagination.setList(store.list);
    const getList = computed<Example[]>(() => {
        return pagination.getFilteredList();
    });
    watch(
        () => store.list,
        () => {
            pagination.setList(store.list ? store.list : []);
            pagination.listLength(store.list ? store.list.length : 1);
        }
    );
    pagination.state.filterCallback = (value: Example, index: number) => {
        // If the filter is empty, everything is fine
        value.index = index + 1;
        if (emptyFilter.value) {
            return true;
        }

        // Filter for the current value of row.full_name etc.
        return value.name.toLowerCase().indexOf(pagination.state.search.toLowerCase()) > -1;
    };
    const setCurrent = (res: Example) => {
        store.doEdit = true;
        store.current = res;
        store.edit = { ...res };
    };
    const viewCurrent = (res: Example) => {
        store.doView = true;
        store.current = res;
    };
    const setCreate = () => {
        store.doCreate = true;
    };
</script>
