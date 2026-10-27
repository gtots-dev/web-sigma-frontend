'use client'

import { useCallback, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useVehiclesTypeStore } from '@/modules/vehicles-types/presentation/stores/vehicles-types.store'
import type { TrafficFlowFiltersInterface } from '@/modules/traffic-flow/domain/interfaces/traffic-flow-filters.interface'
import { useTrafficFlowStore } from '../stores/traffic-flow.store'

export function useTrafficFlowData(
  initialSettings: TrafficFlowFiltersInterface
) {
  const { operationId, contractId }: UrlParams = useParams()
  const { vehiclesTypes, getVehiclesTypes } = useVehiclesTypeStore()
  const { trafficsFlows, getTrafficFlow, isLoading, isFetched } =
    useTrafficFlowStore()
  const initialSettingsRef = useRef(initialSettings)

  useEffect(() => {
    initialSettingsRef.current = initialSettings
  }, [initialSettings])

  const fetchTrafficFlow = useCallback(async () => {
    await getVehiclesTypes({ operationId, contractId })
    await getTrafficFlow(
      { operationId, contractId },
      initialSettingsRef.current
    )
  }, [getVehiclesTypes, getTrafficFlow, operationId, contractId])

  useEffect(() => {
    fetchTrafficFlow()
  }, [fetchTrafficFlow])

  return {
    isFetched,
    trafficsFlows,
    vehiclesTypes,
    isLoading,
    fetchTrafficFlow
  }
}
