'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useGroupStore } from '../stores/group.store'
import type { GroupEntity } from '../../domain/entities/group.entity'
import type { GroupWithGroupInterface } from '../../domain/interfaces/group-with-group.interface'

export interface UseGroupByIdResult {
  group: GroupEntity | undefined
  groupWithRelations: GroupWithGroupInterface | undefined
  groups: GroupWithGroupInterface[]
  loading: boolean
}

export function useGroupById(groupId: number): UseGroupByIdResult {
  const { operationId, contractId }: UrlParams = useParams()
  const { groups, getGroups } = useGroupStore()

  const groupWithRelations = useMemo(
    () => groups.find((g) => g.group.id === groupId),
    [groups, groupId]
  )

  const [loading, setLoading] = useState(!groupWithRelations)

  useEffect(() => {
    if (groupWithRelations) return

    let active = true
    getGroups({ operationId, contractId })
      .catch(() => undefined)
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
    // Busca apenas uma vez ao montar caso o grupo não esteja no store
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    group: groupWithRelations?.group,
    groupWithRelations,
    groups,
    loading: loading && !groupWithRelations
  }
}
