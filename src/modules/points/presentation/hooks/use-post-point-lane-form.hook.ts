'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import {
  PostPointLaneFormSchema,
  type PostPointLaneFormType
} from '../../presentation/schemas/post-point-lane-form.schema'
import type { PointEntity } from '../../domain/entities/point.entity'
import { useLaneStore } from '@/modules/lanes/presentation/stores/lanes.store'

export function usePostPointLaneForm(pointId: PointEntity['id']) {
  const { contractLanes } = useLaneStore()

  const isLanesIdSelected = useMemo<number[]>(
    () =>
      contractLanes
        .filter((contractLane) => contractLane.point_id == pointId)
        .map((contractLane) => contractLane.lane.id),
    [contractLanes, pointId]
  )

  const defaultValues = useMemo<PostPointLaneFormType>(
    () => ({
      laneId: isLanesIdSelected
    }),
    [isLanesIdSelected]
  )

  const methods = useForm<PostPointLaneFormType>({
    resolver: zodResolver(PostPointLaneFormSchema),
    defaultValues
  })

  return {
    defaultValues,
    methods
  }
}
