'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useViolationStore } from '../stores/violations.store'
import type { ViolationEntity } from '../../domain/entities/violation.entity'

export interface UseViolationByIdResult {
  violation: ViolationEntity | undefined
  loading: boolean
}

export function useViolationById(violationId: number): UseViolationByIdResult {
  const { operationId, contractId }: UrlParams = useParams()
  const { violations, getViolations } = useViolationStore()

  const violation = useMemo(
    () => violations.find((v) => v.id === violationId),
    [violations, violationId]
  )

  const [loading, setLoading] = useState(!violation)

  useEffect(() => {
    if (violation) return

    let active = true
    getViolations({ operationId, contractId })
      .catch(() => undefined)
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
    // Busca apenas uma vez ao montar caso a violação não esteja no store
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { violation, loading: loading && !violation }
}
