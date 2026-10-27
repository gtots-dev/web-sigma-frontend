'use client'

import { useEffect, useState, useCallback } from 'react'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useParams } from 'next/navigation'
import { useRestrictionStore } from '../stores/restrictions.store'
import type { RestrictionEntity } from '../../domain/entities/restriction.entity'

export interface UseTableRestrictionsResult {
  restrictions: RestrictionEntity[]
  loading: boolean
}

export function useTableRestrictionsHook(): UseTableRestrictionsResult {
  const { operationId, contractId }: UrlParams = useParams()
  const {
    restrictions,
    getRestrictions: getRestrictionsFromStore,
    loading: storeLoading
  } = useRestrictionStore()
  const [loading, setLoading] = useState(true)

  const getRestrictions = useCallback(async () => {
    await getRestrictionsFromStore({
      operationId,
      contractId
    })
  }, [getRestrictionsFromStore, operationId, contractId])

  useEffect(() => {
    Promise.resolve()
      .then(() => {
        setLoading(true)
        return getRestrictions()
      })
      .finally(() => setLoading(false))
  }, [getRestrictions])

  return { restrictions, loading: loading || storeLoading }
}
