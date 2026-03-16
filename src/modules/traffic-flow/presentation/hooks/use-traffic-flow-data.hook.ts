'use client'

import { useEffect } from 'react'
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
  const { trafficsFlows, getTrafficFlow, isLoading } = useTrafficFlowStore()

  const fetchTrafficFlow = async () => {
    await getVehiclesTypes({ operationId, contractId })
    await getTrafficFlow({ operationId, contractId }, initialSettings)
  }

  useEffect(() => {
    fetchTrafficFlow()
  }, [])

  return {
    trafficsFlows,
    vehiclesTypes,
    isLoading,
    fetchTrafficFlow
  }
}
