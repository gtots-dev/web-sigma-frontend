'use client'

import { useEffect, useState, useCallback } from 'react'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useParams } from 'next/navigation'
import { useGroupStore } from '../stores/group.store'
import type { GroupWithGroupInterface } from '../../domain/interfaces/group-with-group.interface'

export interface UseTableGroupsResult {
  groups: GroupWithGroupInterface[]
  loading: boolean
}

export function useTableGroups(): UseTableGroupsResult {
  const { operationId, contractId }: UrlParams = useParams()
  const { groups, getGroups: getGroupsFromStore, loading: storeLoading } = useGroupStore()
  const [loading, setLoading] = useState(true)

  const getGroups = useCallback(async () => {
    await getGroupsFromStore({
      operationId,
      contractId
    })
  }, [getGroupsFromStore, operationId, contractId])

  useEffect(() => {
    let active = true
    Promise.resolve()
      .then(() => {
        if (active) setLoading(true)
        return getGroups()
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [getGroups])

  return { groups, loading: loading || storeLoading }
}
