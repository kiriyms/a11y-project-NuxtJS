<script setup lang="ts">
definePageMeta({
    layout: 'profile',
    middleware: ['token-guard'],
});

const authRequestSubscription = useAuthFetch(requestSubscription)
const subscribe = async () => {
    const res = await authRequestSubscription()
    if (!res.refreshSuccess) {
        console.log('unauthorized: refresh not successful for requestSubscription')
        navigateTo('/login')
    }
    if (!res.result.success) {
        console.error(`subscription request failed: ${JSON.stringify(res.result.error)}`)
        return
    }
    console.log(`subscription request successful: ${JSON.stringify(res.result.data)}`)
    navigateTo(`${res.result.data}`, { external: true })
}
</script>

<template>
    <div 
        class="
            flex flex-col
            gap-4
            p-4 
            md:pl-8
        "    
    >
        <UButton icon="material-symbols:arrow-back" label="Back" to="/profile" class="max-w-fit" />
        <div class="font-bold text-3xl">Premium Plan</div>
        <div class="text-xl">Subscribe to the Premium plan to immediately get:</div>
        <ul class="flex flex-col gap-1">
            <li>
                <UIcon name="material-symbols:check-circle-outline" />
                <span>Unlimited reports per month</span>
            </li>
            <li>
                <UIcon name="material-symbols:check-circle-outline" />
                <span>Advanced support</span>
            </li>
            <li>
                <UIcon name="material-symbols:check-circle-outline" />
                <span>Access to summaries</span>
            </li>
            <li class="text-muted">
                <UIcon name="material-symbols:lock-outline" />
                <span>(Coming soon!) Automatic monthly reports</span>
            </li>
            <li class="text-muted">
                <UIcon name="material-symbols:lock-outline" />
                <span>(Coming soon!) AI summaries and tips</span>
            </li>
        </ul>
        <div class="font-bold text-2xl">
            Price: <span class="text-primary">9.99 €</span> / month
        </div>
        <UButton label="Subscribe!" class="max-w-fit" @click="subscribe" />
    </div>
</template>
