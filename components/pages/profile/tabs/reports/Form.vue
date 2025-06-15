<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { Report } from '~/models/Report';
import { useReportStore } from '~/composables/useReportStore'

const toast = useToast()
type Schema = v.InferOutput<typeof schema>

const schema = v.object({
    url: v.pipe(v.string(), v.url()),
})

const state = reactive({
    url: '',
})

const config = useRuntimeConfig()
const { updateReport } = useReportStore()
const accessTokenCookie = useCookie('access-token')
async function onSubmit(event: FormSubmitEvent<Schema>) {
    toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
    console.log(event.data)

    // ------------------
    // const accessToken = localStorage.getItem('access-token')
    const res = await $fetch<Report>(`${config.public.serverUrl}/report`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessTokenCookie.value}`,
        },
        body: {
            domain: event.data.url,
        }
    })
    console.log(res)
    updateReport(res)
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
                justify-center
            "
        >
            <UButton type="submit" class="rounded-full">
                Generate Report
            </UButton>
        </div>
    </UForm>
</template>
