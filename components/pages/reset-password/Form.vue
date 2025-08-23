<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'

const toast = useToast()
type Schema = v.InferOutput<typeof schema>

const schema = v.object({
    email: v.pipe(v.string(), v.email('Invalid email')),
})

const state = reactive({
    email: '',
})

const disabled = ref(false)
const timer = ref(10)
let intervalId: ReturnType<typeof setInterval> | null = null
const config = useRuntimeConfig()
async function onSubmit(event: FormSubmitEvent<Schema>) {
    console.log(event.data)
    
    disabled.value = true
    timer.value = 10
    
    intervalId = setInterval(() => {
        timer.value -= 1;

        if (timer.value <= 0) {
            disabled.value = false;
            clearInterval(intervalId!);
            intervalId = null;
        }
    }, 1000);

    // ------------------
    try {
        const res: boolean = await $fetch(`${config.public.serverUrl}/auth/password/reset`, {
            method: 'POST',
            body: {
                email: event.data.email,
            }
        })
        toast.add({ 
            title: 'Success', 
            description: 'Reset link sent successfully. Please check your email.', 
            color: 'success', 
            icon: 'material-symbols:check',
            duration: 0 
        })
        console.log(`Password reset init response: ${res}`)
    } catch (error) {
        console.error('Error sending reset link:', error)
        toast.add({ 
            title: 'Error', 
            description: 'Failed to send reset link. Please try again later.', 
            color: 'error', 
            icon: 'material-symbols:cancel-outline',
            duration: 0 
        })
    }
    // ------------------
}

onUnmounted(() => {
    if (intervalId) clearInterval(intervalId)
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
        <UFormField label="Email" name="email" required>
            <UInput 
                v-model="state.email"
                placeholder="john.doe@gmail.com" 
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
                Send Reset Link
            </UButton>
        </div>
        <div v-if="disabled" class="w-full text-center text-muted">Resend in 0:{{ timer >= 10 ? timer.toString() : '0' + timer.toString() }}</div>
    </UForm>
</template>
