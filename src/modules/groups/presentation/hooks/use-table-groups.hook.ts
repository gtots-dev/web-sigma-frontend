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
  const { groups, getGroups: getGroupsFromStore } = useGroupStore()
  const [loading, setLoading] = useState(true)

  const getGroups = useCallback(async () => {
    setLoading(true)
    await getGroupsFromStore({
      operationId,
      contractId
    })
    setLoading(false)
  }, [getGroupsFromStore, operationId, contractId])

  useEffect(() => {
    getGroups()
  }, [getGroups])

  return { groups, loading }
}
