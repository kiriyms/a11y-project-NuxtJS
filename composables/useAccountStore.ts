import type { Account } from '~/models/Account';

export const useAccountStore = () => {
  const account = useState<Account | null>('account', () => null)

  const updateAccount = (newAccount: Account | null) => {
    account.value = newAccount
  }

  const updateRemainingReports = (remainingReports: number) => {
    if (account.value) {
        account.value.remainingReports = remainingReports
    }
  }

  return {
    account,
    updateAccount,
    updateRemainingReports,
  }
}