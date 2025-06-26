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
            <div class="text-3xl">The purchase was <span class="text-error">canceled</span></div>
            <div>Did you experience a problem with the purchase? If you need assistance, please submit your feedback to our email <span class="font-bold text-primary">accessibilitysupp@gmail.com</span></div>
            <UButton label="To Profile" to="/profile" />
        </div>
    </div>
</template>
