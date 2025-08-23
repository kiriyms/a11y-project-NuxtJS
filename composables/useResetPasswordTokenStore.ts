export const useResetPasswordTokenStore = () => {
  const resetPasswordTokenCookie = useCookie<string | null>('reset-password-token')

  // useState reads the cookie once during initial setup
  const resetPasswordToken = useState<string | null>('reset-password-token', () => resetPasswordTokenCookie.value)

  const updateResetPassword = (access: string) => {
    resetPasswordToken.value = access
    resetPasswordTokenCookie.value = access
  }

  return {
    resetPasswordToken,
    updateResetPassword,
  }
}