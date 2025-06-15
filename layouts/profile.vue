<script setup lang="ts"></script>

<template>
    <div class="flex flex-col min-h-screen">
        <LayoutsProfileHeader />
        <main class="flex-1 flex flex-col">
            <slot />
        </main>
        <LayoutsDefaultFooter />
    </div>
</template>