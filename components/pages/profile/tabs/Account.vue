<script setup lang="ts">
const { account } = useAccountStore()

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
                <p>Email: {{ account?.email }}</p>
                <p v-if="!account?.isVerified" class="text-warning">Your email is not verified. You can verify by clicking the link sent to your email.</p>
                <UButton v-if="!account?.isVerified" label="Resend verification link" class="w-min" @click="resend" />
                <p>Role: {{ account?.role }}</p>
            </div>
        </div>
        <div class="w-full">
            <h1 class="font-bold text-2xl mt-2">Subscription</h1>
            <div class="flex flex-col gap-2 mt-2 ml-4">
                <p>Type: {{ account?.subscription }}</p>
                <UButton v-if="account?.subscription !== 'PREMIUM'" label="Upgrade" to="/profile/checkout" class="w-min" />
                <UButton v-else label="Manage Subscription" :to="config.public.stripeManageSubscriptionUrl" external color="warning" class="w-min" />
            </div>
        </div>
    </div>
</template>