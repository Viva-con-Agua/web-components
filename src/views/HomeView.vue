<script setup lang="ts">
    import HomeMain from '@/components/HomeMain.vue';
    import { useMainStore } from '@/stores/MainStore';
    import { useI18n } from 'vue-i18n';
    const store = useMainStore();
    const { t } = useI18n();

    store.breadcrumb = t('navigation.home.breadcrumb');
</script>

<template>
    <HomeMain :msg="$t('home.welcome')" class="m-auto columns-1" />
</template>
