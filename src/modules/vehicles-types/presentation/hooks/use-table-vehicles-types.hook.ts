'use client'

import { useEffect, useState, useCallback } from 'react'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useParams } from 'next/navigation'
import { useVehiclesTypeStore } from '../stores/vehicles-types.store'
import type { VehicleEntity } from '../../domain/entities/vehicle-types.entity'

export interface UseTableVehiclesTypesResult {
  vehiclesTypes: VehicleEntity[]
  loading: boolean
}

export function useTableVehiclesTypes(): UseTableVehiclesTypesResult {
  const { operationId, contractId }: UrlParams = useParams()
  const { vehiclesTypes, getVehiclesTypes: getVehiclesTypesFromStore } =
    useVehiclesTypeStore()
  const [loading, setLoading] = useState(true)

  const getVehiclesTypes = useCallback(async () => {
    setLoading(true)
    await getVehiclesTypesFromStore({
      operationId,
      contractId
    })
    setLoading(false)
  }, [getVehiclesTypesFromStore, operationId, contractId])

  useEffect(() => {
    getVehiclesTypes()
  }, [getVehiclesTypes])

  return { vehiclesTypes, loading }
}
