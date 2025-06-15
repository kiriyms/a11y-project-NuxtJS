<script setup lang="ts">
definePageMeta({
    layout: 'profile',
    middleware: ['token-guard'],
});

const route = useRoute()
const authPollReport = useAuthFetch(pollReport)
const report = await authPollReport(route.params.id as string)
console.log(JSON.stringify(report))
const config = useRuntimeConfig()
</script>

<template>
    <div 
        class="
            flex flex-col flex-1
            p-4
            gap-2
        "
    >
        <UButton icon="material-symbols:arrow-back" label="Back" to="/profile" class="max-w-fit" />
        <iframe
            :src="'https://mozilla.github.io/pdf.js/web/viewer.html?file=' + config.public.serverUrl + '/' + (report.result.success ? report.result.data.fileName : '')"
            class="flex-1"
        ></iframe>
    </div>
</template>
