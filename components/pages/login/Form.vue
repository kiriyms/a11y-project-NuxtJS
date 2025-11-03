<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'

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
const route = useRoute()
const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
    console.log(event.data)

    // ------------------
    try {
        const res: { accessToken: string, refreshToken: string } = await $fetch(`${config.public.serverUrl}/auth/login`, {
            method: 'POST',
            body: {
                email: event.data.email,
                password: event.data.password
            }
        })
        updateTokens(res.accessToken, res.refreshToken)

        if (route.query.redirectLink) {
            const redirectLink = route.query.redirectLink as string
            console.log(`Redirecting to: ${redirectLink}`)

            switch (redirectLink) {
                case 'checkout':
                    navigateTo('/profile/checkout')
                    break;
                default:
                    console.warn(`Unknown redirect link: ${redirectLink}`)
                    navigateTo('/profile')
                    break;
            }
        } else {
            navigateTo('/profile')
        }
    } catch (error) {
        console.error(error)
        toast.add({ 
            title: 'Error', 
            description: `Failed to log in. Please check your credentials: ${error}`, 
            color: 'error', 
            icon: 'material-symbols:cancel-outline',
            duration: 0 
        })
    }
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
            <UButton 
                label="Forgot your password?" 
                variant="link" 
                to="/reset-password" 
                class="
                    text-primary underline px-1
                " 
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
