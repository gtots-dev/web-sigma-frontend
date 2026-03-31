'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMemo } from 'react'
import {
  PostVehicleFormSchema,
  type PostVehicleFormType
} from '../schemas/post-vehicle-form.schema'
import type { VehicleTypeEntity } from '../../domain/entities/vehicle-types.entity'

export function usePostVehicleTypeForm() {
  const defaultValues = useMemo<VehicleTypeEntity>(
    () => ({
      name: '',
      color: '#000000',
      code: undefined
    }),
    []
  )

  const methods = useForm<PostVehicleFormType>({
    resolver: zodResolver(PostVehicleFormSchema),
    defaultValues
  })

  return {
    defaultValues,
    methods
  }
}
