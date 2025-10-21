'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMemo } from 'react'
import { PutLaneStatusFormSchema, type PutLaneStatusFormType } from '../schemas/put-lane-status-form.schema'
import type { LaneEntity } from '../../domain/entities/lane.entity'

export function usePutLaneStatusForm(lane: LaneEntity) {
  const defaultValues = useMemo<Partial<LaneEntity>>(
    () => ({
      id: lane.id,
      enabled: lane.enabled
    }),
    [lane]
  )

  const methods = useForm<PutLaneStatusFormType>({
    resolver: zodResolver(PutLaneStatusFormSchema),
    defaultValues
  })

  return {
    defaultValues,
    methods
  }
}
