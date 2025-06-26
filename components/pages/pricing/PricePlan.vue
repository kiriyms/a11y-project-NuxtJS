<script setup lang="ts">
const props = defineProps({
    headerLabel: {
        type: String,
        required: true,
    },
    footerLabel: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    features: {
        type: Array<Array<string>>,
        required: true,
    },
    buttonDisabled: {
        type: Boolean,
        required: true,
    },
    buttonLink: {
        type: String,
        required: true,
    },
});
const { headerLabel, footerLabel, price, features, buttonDisabled, buttonLink } = props;
</script>

<template>
    <UCard variant="solid" class="shadow-xl max-w-80">
        <template #header>
            <div 
                class="
                    font-bold 
                    text-2xl 
                    border-b-2
                "
            >
                {{ headerLabel }}
            </div>
        </template>
        <div
            class="
                flex flex-col
                gap-4
                p-4
            "
        >
            <div
                class="
                    text-4xl
                    font-bold
                    text-primary
                "
            >
                {{ price }}
                <span class="font-bold text-xl">per month</span>
            </div>
            <ul>
                <li v-for="(feature, index) in features" :key="index">
                    <UIcon v-if="feature[1] === 'true'" name="material-symbols:check-circle-outline" />
                    <UIcon v-else name="material-symbols:lock-outline" />
                    {{ feature[0] }}
                </li>
            </ul>
        </div>
        <template #footer>
            <div class="w-full flex justify-center">
                <UButton 
                    :label="footerLabel" 
                    :disabled="buttonDisabled" 
                    :to="buttonLink" 
                    class="rounded-full" 
                />
            </div>
        </template>
    </UCard>
</template>
