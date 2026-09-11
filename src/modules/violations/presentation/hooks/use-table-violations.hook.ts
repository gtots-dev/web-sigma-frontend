'use client'

import { useEffect, useState, useCallback } from 'react'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useParams } from 'next/navigation'
import { useViolationStore } from '../stores/violations.store'
import type { ViolationInterface } from '../../domain/interfaces/violation.interface'

export interface UseTableViolationsResult {
  violations: ViolationInterface[]
  loading: boolean
}

export function useTableViolationsHook(): UseTableViolationsResult {
  const { operationId, contractId }: UrlParams = useParams()
  const {
    violations,
    getViolations: getViolationsFromStore,
    loading: storeLoading
  } = useViolationStore()
  const [loading, setLoading] = useState(true)

  const getViolations = useCallback(async () => {
    setLoading(true)
    await getViolationsFromStore({
      operationId,
      contractId
    })
    setLoading(false)
  }, [getViolationsFromStore, operationId, contractId])

  useEffect(() => {
    getViolations()
  }, [getViolations])

  return { violations, loading: loading || storeLoading }
}
