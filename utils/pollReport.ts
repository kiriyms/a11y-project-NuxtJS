import type { Result } from "~/models/Result"
import type { Report } from '~/models/Report';
import { FetchError } from 'ofetch'

export default async function (reportId: string): Promise<Result<Report>> {
    const config = useRuntimeConfig()
    const { accessToken } = useTokenStore()
    console.log(`report-poll-token cookie: ${accessToken.value}`)
    try {
        const res = await $fetch<Report>(`${config.public.serverUrl}/report/for-user/${reportId}`, {
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