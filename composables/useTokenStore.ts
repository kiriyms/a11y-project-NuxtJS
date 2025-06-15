export const useTokenStore = () => {
  const accessTokenCookie = useCookie<string | null>('access-token')
  const refreshTokenCookie = useCookie<string | null>('refresh-token')

  // useState reads the cookie once during initial setup
  const accessToken = useState<string | null>('access-token', () => accessTokenCookie.value)
  const refreshToken = useState<string | null>('refresh-token', () => refreshTokenCookie.value)

  const updateTokens = (access: string, refresh: string) => {
    accessToken.value = access
    refreshToken.value = refresh
    accessTokenCookie.value = access
    refreshTokenCookie.value = refresh
  }

  const updateAccess = (access: string) => {
    accessToken.value = access
    accessTokenCookie.value = access
  }

  const updateRefresh = (refresh: string) => {
    refreshToken.value = refresh
    refreshTokenCookie.value = refresh
  }

  return {
    accessToken,
    refreshToken,
    updateTokens,
    updateAccess,
    updateRefresh,
  }
}