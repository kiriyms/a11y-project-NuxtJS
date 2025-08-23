<script setup lang="ts">
definePageMeta({
    middleware: ['reset-password-guard'],
});
</script>

<template>
    <div
        class="
            flex flex-col
            gap-2
            p-4
        "
    >
        <PagesResetPasswordCallbackFormCard />
    </div>
</template>
