export default defineNuxtRouteMiddleware(async (_to, _from) => {
    if (import.meta.server) return

    // const accessTokenCookie = useCookie('access-token')
    // const refreshTokenCookie = useCookie('refresh-token')

    const { updateTokens } = useTokenStore()

    const accessToken = _to.query.accessToken as string | undefined
    const refreshToken = _to.query.refreshToken as string | undefined

    console.log(`access: ${accessToken}`)
    console.log(`refresh: ${refreshToken}`)
    
    // accessTokenCookie.value = accessToken
    // refreshTokenCookie.value = refreshToken

    updateTokens(accessToken ?? '', refreshToken ?? '')

    // add ?redirect=checkout if it exists
    return navigateTo({ path: '/profile', query: { } }, { replace: true })
})