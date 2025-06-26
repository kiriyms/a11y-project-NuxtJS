<script setup lang="ts">
const freeFeatures = ref<string[][]>([
    ['Up to 5 reports per month', 'true'], 
    ['Basic support', 'true'], 
    ['Access to summaries', 'true'],
])
const premiumFeatures = ref<string[][]>([
    ['Unlimited reports per month', 'true'], 
    ['Advanced support', 'true'], 
    ['Access to summaries', 'true'], 
    ['(Coming soon!) Automatic monthly reports', 'false'], 
    ['(Coming soon!) AI summaries and tips', 'false'],
])
</script>

<template>
    <div 
        class="
            flex flex-col
            items-center
            gap-6
            p-4
            md:flex-row
            md:items-start
            md:justify-center
        "
    >
        <PagesPricingPricePlan 
            header-label="Free" 
            footer-label="Available by default"
            price="$ 0"
            :features="freeFeatures"
            :button-disabled="true"
            button-link="/"
        />
        <PagesPricingPricePlan 
            header-label="Premium" 
            footer-label="Subscribe!"
            price="$ 15"
            :features="premiumFeatures"
            :button-disabled="false"
            button-link="/profile/checkout"
        />
    </div>
</template>
