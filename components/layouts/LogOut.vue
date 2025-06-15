<script setup lang="ts">
const props = defineProps({
    inverse: {
        type: Boolean,
        default: false,
    },
});

const { updateTokens } = useTokenStore();
const authLogout = useAuthFetch(logoutUser);
const logout = async () => {
    await authLogout();
    updateTokens("", "");
    navigateTo("/auth/login");
}
</script>

<template>
    <div 
        v-if="!props.inverse"
        class="
            flex 
            items-center 
            gap-2
        "
    >
        <UButton label="Log Out" color="warning" @click="logout" />
        <LayoutsColorModeButton />
    </div>

    <div
        v-else  
        class="
            flex 
            items-center 
            gap-2
        "  
    >
        <LayoutsColorModeButton />
        <UButton label="Log Out" color="warning" @click="logout" />
    </div>
</template>