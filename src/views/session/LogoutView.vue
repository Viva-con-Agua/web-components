<template>
    <div class="m-auto text-center">
        <h1 class="text-[3rem] md:text-[5rem]">{{ $t('messages.logout.redirect') }}</h1>
    </div>
</template>
<script lang="ts" setup>
    import { useSessionStore } from '@/stores/SessionStore';
    import { onMounted } from 'vue';

    const store = useSessionStore();
    onMounted(() => {
        store.logout().finally(() => {
            window.location.href = '/';
        });
    });
</script>
