<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'

const toast = useToast()
type Schema = v.InferOutput<typeof schema>

const schema = v.object({
    email: v.pipe(v.string(), v.email('Invalid email')),
    // password: v.pipe(v.string(), v.minLength(8, 'Must be at least 8 characters'))
    password: v.pipe(v.string())
})

const state = reactive({
    email: '',
    password: ''
})

const { updateTokens } = useTokenStore();
const config = useRuntimeConfig()
async function onSubmit(event: FormSubmitEvent<Schema>) {
    toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
    console.log(event.data)

    // ------------------
    const res: { accessToken: string, refreshToken: string } = await $fetch(`${config.public.serverUrl}/auth/login`, {
        method: 'POST',
        body: {
            email: event.data.email,
            password: event.data.password
        }
    })
    updateTokens(res.accessToken, res.refreshToken)
    navigateTo('/profile')
    // ------------------
}
</script>

<template>
    <UForm 
        :schema="schema" 
        :state="state" 
        class="
            space-y-4
        " 
        @submit="onSubmit"
    >
        <UFormField label="Email" name="email" required>
            <UInput 
                v-model="state.email"
                placeholder="john.doe@gmail.com" 
                class="w-full" 
            />
        </UFormField>
        <UFormField label="Password" name="password" required>
            <UInput 
                v-model="state.password" 
                placeholder="********"
                type="password" 
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
                Continue
            </UButton>
        </div>
    </UForm>
</template>
