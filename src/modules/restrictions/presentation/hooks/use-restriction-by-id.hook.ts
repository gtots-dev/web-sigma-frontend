'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useRestrictionStore } from '../stores/restrictions.store'
import type { RestrictionEntity } from '../../domain/entities/restriction.entity'

export interface UseRestrictionByIdResult {
  restriction: RestrictionEntity | undefined
  loading: boolean
}

export function useRestrictionById(
  restrictionId: number
): UseRestrictionByIdResult {
  const { operationId, contractId }: UrlParams = useParams()
  const { restrictions, getRestrictions } = useRestrictionStore()

  const restriction = useMemo(
    () => restrictions.find((r) => r.id === restrictionId),
    [restrictions, restrictionId]
  )

  const [loading, setLoading] = useState(!restriction)

  useEffect(() => {
    if (restriction) return

    let active = true
    getRestrictions({ operationId, contractId })
      .catch(() => undefined)
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
    // Busca apenas uma vez ao montar caso a restrição não esteja no store
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { restriction, loading: loading && !restriction }
}
