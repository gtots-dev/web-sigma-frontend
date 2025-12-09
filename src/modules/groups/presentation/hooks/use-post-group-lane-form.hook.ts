'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import {
  PostGroupLaneFormSchema,
  type PostGroupLaneFormType
} from '../../presentation/schemas/post-group-lane-form.schema'
import type { GroupEntity } from '../../domain/entities/group.entity'
import { useLaneStore } from '@/modules/lanes/presentation/stores/lanes.store'

export function usePostGroupLaneForm(groupId: GroupEntity['id']) {
  const { contractLanes } = useLaneStore()

  const isLanesIdSelected = useMemo<number[]>(
    () =>
      contractLanes
        .filter((contractLane) => contractLane.group_id.includes(groupId))
        .map((contractLane) => contractLane.lane.id),
    [contractLanes, groupId]
  )

  const defaultValues = useMemo<PostGroupLaneFormType>(
    () => ({
      laneId: isLanesIdSelected
    }),
    [isLanesIdSelected]
  )

  const methods = useForm<PostGroupLaneFormType>({
    resolver: zodResolver(PostGroupLaneFormSchema),
    defaultValues
  })

  return {
    defaultValues,
    methods
  }
}
