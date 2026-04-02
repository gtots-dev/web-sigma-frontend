import { useMemo } from 'react'
import type { TrafficFlowInterface } from '@/modules/traffic-flow/domain/interfaces/traffic-flow.interface'
import type { VehiclesTypesInterface } from '@/modules/vehicles-types/domain/interfaces/vehicle-type.interface'
import { TOTAL_CHART_SERIES } from '@/modules/system/infrastructure/configs/total-chart-series.config'

export function useTrafficFlowAbsoluteSeries(
  trafficsFlows: TrafficFlowInterface,
  vehiclesTypes: VehiclesTypesInterface[]
) {
  return useMemo(() => {
    if (!trafficsFlows?.volume_absolute?.length) return []

    const volume = trafficsFlows.volume_absolute[0]
    const vehiclesMap = new Map(vehiclesTypes.map((v) => [String(v.id), v]))

    return Object.keys(volume).map((key) => {
      if (key === TOTAL_CHART_SERIES.key) {
        return {
          key: TOTAL_CHART_SERIES.key,
          label: TOTAL_CHART_SERIES.label,
          color: TOTAL_CHART_SERIES.color,
          vehicleTypeId: TOTAL_CHART_SERIES.key
        }
      }

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
