<script setup lang="ts">
import { Account } from '~/models/Account';

const props = defineProps({
    data: {
        type: [Account, null],
        required: true,
    },
});

const accessTokenCookie = useCookie('access-token')
const config = useRuntimeConfig()
async function resend() {
    await $fetch(`${config.public.serverUrl}/auth/verify/resend`, {
        headers: {
            'Authorization': `Bearer ${accessTokenCookie.value}`,
        },
    })
}
</script>

<template>
    <div
        class="
            w-full
        "
    >
        <div class="w-full border-b-2 pb-4">
            <h1 class="font-bold text-2xl mt-2">General</h1>
            <div class="flex flex-col gap-2 mt-2 ml-4">
                <p>Email: {{ props.data?.email }}</p>
                <p v-if="!props.data?.isVerified" class="text-warning">Your email is not verified. You can verify by clicking the link sent to your email.</p>
                <UButton v-if="!props.data?.isVerified" label="Resend verification link" class="w-min" @click="resend" />
                <p>Role: {{ props.data?.role }}</p>
            </div>
        </div>
        <div class="w-full">
            <h1 class="font-bold text-2xl mt-2">Subscription</h1>
            <div class="flex flex-col gap-2 mt-2 ml-4">
                <p>Type: {{ props.data?.subscription }}</p>
                <UButton v-if="props.data?.subscription !== 'PREMIUM'" label="Upgrade" to="/profile/checkout" class="w-min" />
                <UButton v-else label="Manage Subscription" :to="config.public.stripeManageSubscriptionUrl" external color="warning" class="w-min" />
            </div>
        </div>
    </div>
</template>