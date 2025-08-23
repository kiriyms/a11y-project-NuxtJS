<script setup lang="ts">
import type { Report } from '~/models/Report';

const props = defineProps({
    data: {
        type: [Array<Report>, null],
        required: true,
    },
    refresh: {
        type: Function,
        required: true,
    },
});
</script>

<template>
    <PagesProfileTabsReportsForm />
    <div class="text-lg font-bold border-t-2 mt-2 pt-2">
        My Reports <UButton icon="material-symbols:refresh" @click="refresh()" />
    </div>
    <PagesProfileTabsReportsHistory :data="props.data" />
</template>