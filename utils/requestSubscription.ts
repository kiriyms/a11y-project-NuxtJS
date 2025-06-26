/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Result } from "~/models/Result"
import { FetchError } from 'ofetch'

export default async function (): Promise<Result<any>> {
    const config = useRuntimeConfig()
    const { accessToken } = useTokenStore()
    console.log(`request-subscription cookie: ${accessToken.value}`)
    try {
        const res = await $fetch<boolean>(`${config.public.serverUrl}/auth/subscribe-premium`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken.value}`,
            }
        })
        return { success: true, data: res }
    } catch (err) {
        if (err instanceof FetchError) {
            console.log(`error status code: ${err.response?.status}`)
        }
        return { success: false, error: { code: 401, message: "unauthorized" } }
    }
}