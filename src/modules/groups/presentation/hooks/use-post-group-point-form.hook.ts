'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import {
  PostGroupPointFormSchema,
  type PostGroupPointFormType
} from '../schemas/post-group-point-form.schema'
import type { GroupEntity } from '../../domain/entities/group.entity'
import { usePointStore } from '@/modules/points/presentation/stores/point.store'

export function usePostGroupPointForm(groupId: GroupEntity['id']) {
  const { points } = usePointStore()

  const isPointsIdSelected = useMemo<number[]>(
    () =>
      points
        .filter((point) => point.group_id.includes(groupId))
        .map((point) => point.point.id),
    [points, groupId]
  )

  const defaultValues = useMemo<PostGroupPointFormType>(
    () => ({
      pointId: isPointsIdSelected
    }),
    [isPointsIdSelected]
  )

  const methods = useForm<PostGroupPointFormType>({
    resolver: zodResolver(PostGroupPointFormSchema),
    defaultValues
  })

  return {
    defaultValues,
    methods
  }
}
