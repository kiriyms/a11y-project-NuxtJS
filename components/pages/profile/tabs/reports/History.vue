<script setup lang="ts">
import type { Report } from '~/models/Report';

const props = defineProps({
    data: {
        type: [Array<Report>, null],
        required: true,
    },
});
</script>

<template>
    <div 
        v-if="!props.data || props.data.length === 0"
        class="
            mt-2
            text-2xl
            text-muted
            font-bold
        "
    >
        No Reports to display
    </div>
    <ul
        v-else
        class="w-full flex flex-col space-y-2 mt-2"
    >
        <PagesProfileTabsReportsCard 
            v-for="report in props.data" :key="report.id" 
            :date="report.createdAt.toString()"
            :domain="report.domain"
            :status="report.status"
            :link="`/profile/report/${report.id}`"
        />
    </ul>
</template>