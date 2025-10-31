// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/ui'
  ],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      serverUrl: process.env.NUXT_PUBLIC_SERVER_URL,
      stripeManageSubscriptionUrl: process.env.NUXT_PUBLIC_STRIPE_MANAGE_SUBSCRIPTION_URL,
    }
  },
  experimental: {
    cookieStore: true,
  },
})