'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMemo } from 'react'

import type { VehicleTypeEntity } from '../../domain/entities/vehicle-types.entity'
import {
  PatchVehicleTypeFormSchema,
  type PatchVehicleTypeFormType
} from '../schemas/patch-vehicle-form.schema'
import { normalizeHex } from '../utils/color-utils'

export function usePatchVehicleTypeForm(vehicleType: VehicleTypeEntity) {
  const defaultValues = useMemo<VehicleTypeEntity>(
    () => ({
      id: vehicleType.id,
      name: vehicleType.name ?? '',
      color: normalizeHex(vehicleType?.color) ?? '',
      code: vehicleType?.code ?? 1
    }),
    [vehicleType]
  )

  const methods = useForm<PatchVehicleTypeFormType>({
    resolver: zodResolver(PatchVehicleTypeFormSchema),
    defaultValues
  })

  return {
    defaultValues,
    methods
  }
}
