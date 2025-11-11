'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMemo } from 'react'
import {
  PatchLaneStatusFormSchema,
  type PatchLaneStatusFormType
} from '../schemas/patch-lane-status-form.schema'
import type { LaneEnableAndDisableInterface } from '../../domain/interfaces/lane-enable-and-disable.interface'

export function usePatchLaneStatusForm(lane: LaneEnableAndDisableInterface) {
  const defaultValues = useMemo<LaneEnableAndDisableInterface>(
    () => ({
      id: lane.id,
      enabled: lane.enabled
    }),
    [lane]
  )

  const methods = useForm<PatchLaneStatusFormType>({
    resolver: zodResolver(PatchLaneStatusFormSchema),
    defaultValues
  })

  return {
    defaultValues,
    methods
  }
}
