<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'

const toast = useToast()
type Schema = v.InferOutput<typeof schema>

const schema = v.object({
    password: v.pipe(v.string(), v.minLength(8, 'Must be at least 8 characters')),
    repeatPassword: v.pipe(v.string(), v.minLength(8, 'Must be at least 8 characters'))
})

const state = reactive({
    password: '',
    repeatPassword: ''
})

const disabled = ref(false)
const config = useRuntimeConfig()
const { resetPasswordToken } = useResetPasswordTokenStore()
async function onSubmit(event: FormSubmitEvent<Schema>) {
    console.log(event.data)
    
    disabled.value = true

    // ------------------
    try {
        const res: boolean = await $fetch(`${config.public.serverUrl}/auth/password/reset/callback`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${resetPasswordToken.value}`
            },
            body: {
                password: event.data.password,
                repeatPassword: event.data.repeatPassword
            }
        })
        toast.add({ 
            title: 'Success', 
            description: 'Password reset. Please log in again.', 
            color: 'success', 
            icon: 'material-symbols:check',
            duration: 0 
        })
        console.log(`Password reset init response: ${res}`)
    } catch (error) {
        toast.add({ 
            title: 'Error', 
            description: 'Failed to reset password. Please try again later.', 
            color: 'error', 
            icon: 'material-symbols:cancel-outline',
            duration: 0 
        })
        console.error('Error resetting password:', error)
    } finally {
        disabled.value = false
    }
    // ------------------
}

onMounted(() => {
    console.log(`Reset Password Token: ${resetPasswordToken.value}`)
})
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
        <UFormField label="Password" name="password" required>
            <UInput 
                v-model="state.password" 
                placeholder="********"
                type="password" 
                class="w-full" 
            />
        </UFormField>
        <UFormField label="Repeat Password" name="repeatPassword" required>
            <UInput 
                v-model="state.repeatPassword" 
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
            <UButton :disabled="disabled" type="submit" class="rounded-full">
                Continue
            </UButton>
        </div>
    </UForm>
</template>
