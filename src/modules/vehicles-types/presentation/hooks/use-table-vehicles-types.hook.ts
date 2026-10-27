'use client'

import { useEffect, useState, useCallback } from 'react'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useParams } from 'next/navigation'
import { useVehiclesTypeStore } from '../stores/vehicles-types.store'
import type { VehicleTypeEntity } from '../../domain/entities/vehicle-types.entity'

export interface UseTableVehiclesTypesResult {
  vehiclesTypes: VehicleTypeEntity[]
  loading: boolean
}

export function useTableVehiclesTypes(): UseTableVehiclesTypesResult {
  const { operationId, contractId }: UrlParams = useParams()
  const {
    vehiclesTypes,
    getVehiclesTypes: getVehiclesTypesFromStore,
    loading: storeLoading
  } = useVehiclesTypeStore()
  const [loading, setLoading] = useState(true)

  const getVehiclesTypes = useCallback(async () => {
    await getVehiclesTypesFromStore({
      operationId,
      contractId
    })
  }, [getVehiclesTypesFromStore, operationId, contractId])

  useEffect(() => {
    Promise.resolve()
      .then(() => {
        setLoading(true)
        return getVehiclesTypes()
      })
      .finally(() => setLoading(false))
  }, [getVehiclesTypes])

  return { vehiclesTypes, loading: loading || storeLoading }
}
