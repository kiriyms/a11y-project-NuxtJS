<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const footerItems = ref<NavigationMenuItem[][]>([[
    {
        label: 'Conditions of Use & Privacy Notice',
        to: '/conditions-and-privacy',
    },
]])
</script>

<template>
    <footer
        class="
            flex flex-col 
            items-start 
            justify-between gap-2 
            py-4 px-4 
            inset-shadow-sm
            bg-neutral-100 dark:bg-neutral-800
            md:flex-row 
            md:items-center md:gap-0
            md:px-8 
        "
    >
        <div 
            class="
                flex flex-col 
                gap-2
                md:flex-row 
                md:gap-4
            "
        >
            <div class="font-bold">
                Contact us:
            </div>
            <div 
                class="
                    flex flex-col 
                    gap-2
                "
            >
                <!-- a href mailto: -->
                <div 
                    class="
                        flex 
                        items-center
                        gap-2
                        pl-2
                        md:pl-0
                    "
                >
                    <UIcon name="material-symbols:mail-outline-rounded" />
                    <p>accessibilitysupp@gmail.com</p>
                </div>
                <!-- a href tel: -->
                <!-- <div class="flex gap-2 items-center">
                    <UIcon name="material-symbols:call-outline-rounded" />
                    <p>+358 xx xxx xx xx</p>
                </div> -->
            </div>
        </div>
        <UNavigationMenu
            :items="footerItems"
            highlight
            class="
                hidden 
                md:flex
            "
        />
        <UNavigationMenu
            :items="footerItems"
            highlight
            orientation="vertical"
            class="
                flex 
                md:hidden
            "
        />
    </footer>
</template>