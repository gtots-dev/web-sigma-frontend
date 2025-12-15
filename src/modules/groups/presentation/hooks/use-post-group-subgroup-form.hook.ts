'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

import {
  PostGroupSubgroupFormSchema,
  type PostGroupSubgroupFormType
} from '../schemas/post-group-subgroup-form.schema'

import type { GroupEntity } from '../../domain/entities/group.entity'
import { useGroupStore } from '@/modules/groups/presentation/stores/group.store'

export function usePostGroupSubgroupForm(groupId: GroupEntity['id']) {
  const { groups } = useGroupStore()

  const selectedSubgroupIds = useMemo<number[]>(
    () => groups.find((item) => item.group.id === groupId)?.group_id ?? [],
    [groups, groupId]
  )

  const defaultValues = useMemo<PostGroupSubgroupFormType>(
    () => ({
      subgroupId: selectedSubgroupIds
    }),
    [selectedSubgroupIds]
  )

  const methods = useForm<PostGroupSubgroupFormType>({
    resolver: zodResolver(PostGroupSubgroupFormSchema),
    defaultValues
  })

  return {
    defaultValues,
    methods
  }
}
