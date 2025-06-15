import type { AuthCallResult } from "~/models/AuthCallResult";
import type { Result } from "~/models/Result";

export const useAuthFetch = <TReturn, TArgs extends unknown[] = unknown[]>(
  apiCall: (...args: TArgs) => Promise<Result<TReturn>>
): (...args: TArgs) => Promise<AuthCallResult<TReturn>> => {
  return async (...args: TArgs) => {
    const config = useRuntimeConfig()
    const { accessToken, refreshToken, updateTokens } = useTokenStore()
    
    let result = await apiCall(...args);

    if (result.success) {
      return {
        result,
        refreshSuccess: true,
      }
    }

    if (!result.success && result.error.code !== 401) {
      return {
        result,
        refreshSuccess: true,
      }
    }

    try {
      const refreshResult = await $fetch<{ accessToken: string, refreshToken: string }>(`${config.public.serverUrl}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${refreshToken.value}`,
        }
      })
      console.log(`access cookie was: ${accessToken.value}`)
      console.log(`setting access cookie to: ${refreshResult.accessToken}`)
      updateTokens(refreshResult.accessToken, refreshResult.refreshToken)
      console.log(`access cookie is now: ${accessToken.value}`)
      result = await apiCall(...args);
      console.log(`Successfully refreshed token at AuthCall composable`)
      return {
        result,
        refreshSuccess: true,
      }
    } catch (err) {
      console.log(`Failed to refresh token at AuthCall composable: ${err}`)
      return {
        result,
        refreshSuccess: false,
      }
    }
  };
}