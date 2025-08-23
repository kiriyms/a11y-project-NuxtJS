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
        <PagesResetPasswordForm />
        <template #footer>
            <div
                class="
                    flex
                    w-full
                    justify-center
                    text-muted
                    text-center
                "
            >
                A link to reset your password will be sent to your email.
            </div>
        </template>
    </UCard>
</template>
