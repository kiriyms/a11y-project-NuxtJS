export default defineNuxtRouteMiddleware(async (_to, _from) => {
    if (import.meta.server) return
    
    const accessFetch = useAuthFetch<boolean>(confirmAccessToken)
    const res = await accessFetch()
    
    console.log(`confirm result: ${JSON.stringify(res)}`)
    
    if (res.refreshSuccess && res.result.success) {
        return navigateTo('/profile')
    }
})