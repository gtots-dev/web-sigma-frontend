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
      cfg: JSON.stringify(lane.cfg === null ? {} : lane.cfg)
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
