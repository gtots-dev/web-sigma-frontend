import type { VehiclesTypesInterface } from '@/modules/vehicles-types/domain/interfaces/vehicle-type.interface'
import { mapVehicleNames, useExportCsv } from './use-export-file-csv.hook'
import type { TrafficFlowInterface } from '@/modules/traffic-flow/domain/interfaces/traffic-flow.interface'

export function useTrafficFlowExport(
  trafficsFlows: TrafficFlowInterface,
  vehiclesTypes: VehiclesTypesInterface[]
) {
  const { exportCsv } = useExportCsv()

  const handleExport = (model: keyof TrafficFlowInterface) => {
    exportCsv(
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
