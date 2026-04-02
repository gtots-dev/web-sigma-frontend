import type { VehiclesTypesInterface } from '@/modules/vehicles-types/domain/interfaces/vehicle-type.interface'
import { mapVehicleNames, useExportCsv } from './use-export-file-csv.hook'
import type { TrafficFlowInterface } from '@/modules/traffic-flow/domain/interfaces/traffic-flow.interface'
import type { TrafficFlowGranularityInterface } from '../../domain/interfaces/traffic-flow-granularity.interface'

export function useTrafficFlowExport(
  trafficsFlows: TrafficFlowInterface,
  vehiclesTypes: VehiclesTypesInterface[],
  granularity: TrafficFlowGranularityInterface
) {
  const { exportCsv } = useExportCsv()

  const handleExport = (model: keyof TrafficFlowInterface) => {
    exportCsv(
      granularity,
      trafficsFlows[model].map((volume) =>
        mapVehicleNames(
          volume as Record<string, { data: string; value: number }[]>,
          vehiclesTypes
        )
      ),
      `${model}.csv`
    )
  }

  return { handleExport }
}
