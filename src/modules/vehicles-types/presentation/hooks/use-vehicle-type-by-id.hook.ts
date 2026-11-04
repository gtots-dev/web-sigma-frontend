'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useVehiclesTypeStore } from '../stores/vehicles-types.store'
import type { VehicleTypeEntity } from '../../domain/entities/vehicle-types.entity'

export interface UseVehicleTypeByIdResult {
  vehicleType: VehicleTypeEntity | undefined
  loading: boolean
}

export function useVehicleTypeById(
  vehicleTypeId: number
): UseVehicleTypeByIdResult {
  const { operationId, contractId }: UrlParams = useParams()
  const { vehiclesTypes, getVehiclesTypes } = useVehiclesTypeStore()

  const vehicleType = useMemo(
    () => vehiclesTypes.find((v) => v.id === vehicleTypeId),
    [vehiclesTypes, vehicleTypeId]
  )

  const [loading, setLoading] = useState(!vehicleType)

  useEffect(() => {
    if (vehicleType) return

    let active = true
    getVehiclesTypes({ operationId, contractId })
      .catch(() => undefined)
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
    // Busca apenas uma vez ao montar caso o tipo de veículo não esteja no store
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { vehicleType, loading: loading && !vehicleType }
}
