'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMemo } from 'react'
import {
  AddLaneFormSchema,
  type AddLaneFormType
} from '../schemas/add-lane-form.schema'
import type { LaneEntity } from '../../domain/entities/lane.entity'

export function useAddLaneForm() {
  const defaultValues = useMemo<LaneEntity>(
    () => ({
      name: '',
      cfg: ''
    }),
    []
  )

  const methods = useForm<AddLaneFormType>({
    resolver: zodResolver(AddLaneFormSchema),
    defaultValues
  })

  return {
    defaultValues,
    methods
  }
}
