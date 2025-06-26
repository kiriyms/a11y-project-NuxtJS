<script setup lang="ts">

</script>

<template>
    <div
        class="
            flex flex-col
            items-center
            gap-4
            py-10 px-4
        "
    >
        <div
            class="
                flex flex-col
                items-center
                text-center
                max-w-128
                gap-4
            "
        >
            <div class="text-3xl">Thank you for <span class="text-primary">subscribing!</span></div>
            <div class="font-bold text-xl">Please note that the Premium status may come into effect after a slight delay.</div>
            <div>If you have any problems with the subscription, please contact out support at <span class="font-bold text-primary">accessibilitysupp@gmail.com</span></div>
            <UButton label="To Profile" to="/profile" />
        </div>
    </div>
</template>
