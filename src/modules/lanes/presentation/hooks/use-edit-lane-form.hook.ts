'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMemo } from 'react'

import type { LaneEntity } from '../../domain/entities/lane.entity'
import {
  EditLaneFormSchema,
  type EditLaneFormType
} from '../schemas/edit-lane-form.schema'

export function useEditLaneForm(lane: LaneEntity) {
  const defaultValues = useMemo<LaneEntity>(
    () => ({
      id: lane.id,
      name: lane.name,
      cfg: lane.cfg,
      up_id: lane.up_id,
      contract_id: lane.contract_id,
      operation_id: lane.operation_id,
      enabled: lane.enabled
    }),
    [lane]
  )

  const methods = useForm<EditLaneFormType>({
    resolver: zodResolver(EditLaneFormSchema),
    defaultValues
  })

  return {
    defaultValues,
    methods
  }
}
