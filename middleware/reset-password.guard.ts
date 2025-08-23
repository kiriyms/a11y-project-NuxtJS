export default defineNuxtRouteMiddleware(async (_to, _from) => {
    if (import.meta.server) return

    // const resetPasswordTokenCookie = useCookie<string | null>('reset-password-token')
    const { updateResetPassword } = useResetPasswordTokenStore()

    const resetPasswordToken = _to.query.resetPasswordToken as string | undefined

    console.log(`reset-password: ${resetPasswordToken}`)
    
    // resetPasswordTokenCookie.value = resetPasswordToken ?? null
    updateResetPassword(resetPasswordToken ?? '')
})