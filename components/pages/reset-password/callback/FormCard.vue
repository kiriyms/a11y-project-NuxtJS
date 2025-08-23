<script setup lang="ts">

</script>

<template>
    <UCard
        variant="subtle"
        class="
            w-80
            self-center
            shadow-lg
            md:w-112
        "
    >
        <template #header>
            <span 
                class="
                    font-bold
                    text-xl
                "
            >
                Reset<span class="text-primary"> Password</span>
            </span>
        </template>
        <PagesResetPasswordCallbackForm />
    </UCard>
</template>
