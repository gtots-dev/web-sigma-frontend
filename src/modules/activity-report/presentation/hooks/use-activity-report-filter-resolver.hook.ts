'use client'

import { useCallback, useMemo } from 'react'
import { useContractStore } from '@/modules/contracts/presentation/stores/contract.store'
import { useUserStore } from '@/modules/users/presentation/stores/user.store'

const ACTIVITY_REPORT_FILTER_LABELS: Record<string, string> = {
  actions: 'Busca',
  date_range: 'Período',
  time_range: 'Horário',
  contract_ids: 'Contratos',
  user_ids: 'Usuários'
}

export function useActivityReportFilterResolver() {
  const { contracts } = useContractStore()
  const { users } = useUserStore()

  const contractsMap = useMemo(() => {
    return new Map(contracts.map((c) => [c.id, c.name]))
  }, [contracts])

  const usersMap = useMemo(() => {
    return new Map(users.map((u) => [u.id, u.name]))
  }, [users])

  const handleValueResolver = useCallback(
    (key: string, val: unknown) => {
      if (key === 'contract_ids') {
        const id = Number(val)
        return contractsMap.get(id) ?? null
      }
      if (key === 'user_ids') {
        const id = Number(val)
        return usersMap.get(id) ?? null
      }
      return null
    },
    [contractsMap, usersMap]
  )

  return {
    filterLabels: ACTIVITY_REPORT_FILTER_LABELS,
    handleValueResolver
  }
}
