<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'
import { useReportStore } from '~/composables/useReportStore';
import type { Account } from '~/models/Account';

definePageMeta({
    layout: 'profile',
    middleware: ['token-guard'],
});

const pollingIntervals = new Map<string, ReturnType<typeof setInterval>>()

const { accessToken } = useTokenStore()
const { reports, updateReports, updateReport } = useReportStore()
const { account, updateAccount, updateRemainingReports } = useAccountStore()
const config = useRuntimeConfig()
const { data, refresh, error } = await useFetch<Account>(`${config.public.serverUrl}/auth/profile-info`, {
    headers: {
        'Authorization': `Bearer ${accessToken.value}`,
    },
})
updateReports(data.value?.reports ?? [])
updateAccount(data.value)
watch(data, () => {
    updateReports(data.value?.reports ?? [])
    updateAccount(data.value)
})
watch(reports, () => {
    stopPolling()
    startPolling()
})

const items = ref<TabsItem[]>([
  {
    label: 'Reports',
    icon: 'material-symbols:document-search-outline',
    slot: 'reports' as const
  },
  {
    label: 'Account',
    icon: 'material-symbols:person-outline',
    slot: 'account' as const
  }
])

const authPollReport = useAuthFetch(pollReport)
const pollReportStatus = (reportId: string) => {
    const intervalId = setInterval(async () => {
        const res = await authPollReport(reportId)

        if (!res.refreshSuccess) { 
            console.log('401: refresh not successful for pollreport in pollreportstatus') 
            return
        }
        if (!res.result.success) { 
            console.log() 
            return
        }

        if (res.result.data.status === 'COMPLETED') {
            console.log(`Report ${reportId} is completed.`)
            clearInterval(pollingIntervals.get(reportId))
            pollingIntervals.delete(reportId)

            updateReport(res.result.data)

            toast.add({ 
                title: 'Success', 
                description: 'Your report is ready.', 
                color: 'success',
                icon: 'material-symbols:check',
                duration: 0,
            })
        }

        if (res.result.data.status === 'FAILED') {
            console.log(`Report ${reportId} has failed.`)
            clearInterval(pollingIntervals.get(reportId))
            pollingIntervals.delete(reportId)

            updateRemainingReports(account.value?.remainingReports ? account.value.remainingReports + 1 : -1)
            updateReport(res.result.data)

            toast.add({ 
                title: 'Error', 
                description: 'Failed to generate report. Please try again later.', 
                color: 'error',
                icon: 'material-symbols:cancel-outline',
                duration: 0,
            })
        }
    }, 10000)

    console.log(`starting a polling func for report ${reportId}. Func: ${JSON.stringify(intervalId)}`)
    pollingIntervals.set(reportId, intervalId)
}
const startPolling = () => {
    const pendingReports = reports.value.filter(report => report.status === 'PENDING')

    pendingReports.forEach(report => {
        if (!pollingIntervals.has(report.id)) {
            pollReportStatus(report.id)
        }
    });
}
const stopPolling = () => {
    for (const intervalId of pollingIntervals.values()) {
        clearInterval(intervalId)
    }
    pollingIntervals.clear()
}

const toast = useToast()
watch(error, () => {
    if (error.value) {
        console.error(`Error fetching profile info [${error.value.status}]: ${error.value.message}. Please log in again.`)
        toast.add({ 
            title: 'Error', 
            description: `Failed to fetch profile info [${error.value.status}]: ${error.value.message}. Please log in again.`, 
            color: 'error',
            icon: 'material-symbols:cancel-outline',
            duration: 0,
        })
    }
})

onMounted(() => {
    startPolling()
    if (error.value) {
        console.error(`Error fetching profile info [${error.value.status}]: ${error.value.message}. Please log in again.`)
        toast.add({ 
            title: 'Error', 
            description: `Failed to fetch profile info [${error.value.status}]: ${error.value.message}. Please log in again.`, 
            color: 'error',
            icon: 'material-symbols:cancel-outline',
            duration: 0,
        })
    }
})

onBeforeUnmount(() => {
    stopPolling()
})
</script>

<template>
    <div 
        class="
            flex 
            p-4
        "
    >
        <UTabs 
            orientation="vertical" 
            variant="link" 
            :items="items" 
            class="
                hidden
                relative
                items-start
                w-full
                md:flex 
            "
            :ui="{ list: 'fixed' }"
        >
            <template #reports>
                <div class="ml-36">
                    <PagesProfileTabsReports :data="reports" :refresh="refresh" />
                </div>
            </template>
            
            <template #account>
                <div class="ml-36">
                    <PagesProfileTabsAccount :data="data" />
                </div>
            </template>
        </UTabs>
        
        <UTabs 
            :items="items" 
            class="
                relative
                flex
                items-start 
                gap-4
                w-full
                md:hidden
            "
            :ui="{ 
                list: 'fixed w-auto left-1/2 -translate-x-1/2 z-49 shadow-xl', 
                trigger: 'px-8' 
            }"
        >
            <template #reports>
                <div class="mt-14">
                    <PagesProfileTabsReports :data="reports" :refresh="refresh" />
                </div>
            </template>
            
            <template #account>
                <div class="mt-14">
                    <PagesProfileTabsAccount :data="data" />
                </div>
            </template>
        </UTabs>
    </div>
</template>