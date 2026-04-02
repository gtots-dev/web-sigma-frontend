import { useMemo } from 'react'
import type { TrafficFlowInterface } from '@/modules/traffic-flow/domain/interfaces/traffic-flow.interface'
import type { VehiclesTypesInterface } from '@/modules/vehicles-types/domain/interfaces/vehicle-type.interface'

export function useTrafficFlowPercentageSeries(
  trafficsFlows: TrafficFlowInterface,
  vehiclesTypes: VehiclesTypesInterface[]
) {
  return useMemo(() => {
    if (!trafficsFlows?.volume_percentage?.length) return []

    const volume = trafficsFlows.volume_percentage[0]
    const vehiclesMap = new Map(vehiclesTypes.map((v) => [String(v.id), v]))

    return Object.keys(volume).map((key) => {
      const vehicle = vehiclesMap.get(key)

      return {
        key,
        label: vehicle?.name,
        color: vehicle?.color,
        vehicleTypeId: vehicle?.id
      }
    })
  }, [trafficsFlows, vehiclesTypes])
}
