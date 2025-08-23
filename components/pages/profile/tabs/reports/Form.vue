<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'
import { useReportStore } from '~/composables/useReportStore'

const { account, updateRemainingReports } = useAccountStore()

const toast = useToast()
type Schema = v.InferOutput<typeof schema>

const schema = v.object({
    url: v.pipe(v.string(), v.url()),
})

const state = reactive({
    url: '',
})

const { updateReport } = useReportStore()
const authGenerateReport = useAuthFetch(initiateGenerateReport)
async function onSubmit(event: FormSubmitEvent<Schema>) {
    console.log(event.data)

    // ------------------
    const res = await authGenerateReport(event.data.url)
    
    if (!res.refreshSuccess) {
        console.error('401: refresh not successful for generate report')
        toast.add({ 
            title: 'Error', 
            description: 'Failed to generate report. Please log in again.', 
            color: 'error', 
            icon: 'material-symbols:cancel-outline',
            duration: 0 
        })
        navigateTo('/auth/login')
    }
    if (!res.result.success) {
        console.error(`Error generating report: [${res.result.error.code}] ${res.result.error.message}`)
        toast.add({ 
            title: 'Error', 
            description: `Error generating report: [${res.result.error.code}] ${res.result.error.message}`, 
            color: 'error', 
            icon: 'material-symbols:cancel-outline',
            duration: 0 
        })
        return
    }

    toast.add({ 
        title: 'Report pending', 
        description: 'URL has been submitted. Please wait for the report to be generated.', 
        color: 'warning',
        icon: 'material-symbols:hourglass-top',
        duration: 0,
    })
    updateReport(res.result.data)
    updateRemainingReports(account.value?.remainingReports ? account.value.remainingReports - 1 : -1)
    // ------------------
}
</script>

<template>
    <UForm 
        :schema="schema" 
        :state="state" 
        class="
            flex flex-col
            items-center justify-center
            space-y-4
            md:items-start
        " 
        @submit="onSubmit"
    >
        <UFormField 
            label="URL" 
            name="url"
            help="Make sure the URL is full, including 'http://' or 'https://'" 
            required
        >
            <UInput 
                v-model="state.url"
                placeholder="https://example.com" 
                class="w-full" 
            />
        </UFormField>
        <div 
            class="
                flex 
                justify-center items-center
                gap-4
                font-bold
            "
        >
            <UButton type="submit" class="rounded-full">
                Generate Report
            </UButton>
            <div v-if="account?.subscription !== 'PREMIUM'">Remaining reports this month: {{ account?.remainingReports }}/5</div>
            <div v-else><span class="text-warning">Premium</span>: no monthly limit</div>
        </div>
    </UForm>
</template>
