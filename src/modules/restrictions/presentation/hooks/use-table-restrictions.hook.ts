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
    setLoading(true)
    await getRestrictionsFromStore({
      operationId,
      contractId
    })
    setLoading(false)
  }, [getRestrictionsFromStore, operationId, contractId])

  useEffect(() => {
    getRestrictions()
  }, [getRestrictions])

  return { restrictions, loading: loading || storeLoading }
}
