<script setup lang="ts">
const config = useRuntimeConfig()
function oAuth() {
    window.location.href = `${config.public.serverUrl}/auth/google`
}
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
                Sign<span class="text-primary"> Up</span>
            </span>
        </template>
        <PagesSignupForm />
        <template #footer>
            <div
                class="
                    flex
                    w-full
                    justify-center
                "
            >
                <UButton
                    variant="outline"
                    to="/auth/login"
                    class="
                        flex
                        justify-center
                        w-full
                        text-neutral
                        rounded-full
                    " 
                >
                    Already have an account? <span class="text-primary">Log In</span>
                </UButton>
            </div>
        </template>
    </UCard>
    <div class="self-center text-center w-78 md:w-110">
        <span>By Signing Up or Logging In with Google, you agree to our</span> <NuxtLink to="/conditions-and-privacy" target="_blank"  class="text-primary font-bold underline">Conditions of Use, Terms of Service and Privacy Policy</NuxtLink>
    </div>
    <UButton
        label="Sign up with Google"
        icon="ci:google"
        variant="subtle"
        class="
            flex self-center
            justify-center items-center
            shadow-md
            mt-2
            w-78
            md:w-110
        "
        @click="oAuth"
    />
</template>
