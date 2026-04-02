'use client'

import { useEffect, useMemo, useState } from 'react'
import type { TrafficFlowGranularityInterface } from '@/modules/traffic-flow/domain/interfaces/traffic-flow-granularity.interface'
import type { TrafficFlowFiltersInterface } from '@/modules/traffic-flow/domain/interfaces/traffic-flow-filters.interface'
import { useTrafficFlowData } from '../../hooks/use-traffic-flow-data.hook'
import { useTrafficFlowAbsoluteSeries } from '../../hooks/use-traffic-flow-series.hook'
import { useTrafficChartAdapter } from '../../hooks/use-traffic-chart-adapter'
import { useTrafficFlowExport } from '../../hooks/use-traffic-flow-export.hook'
import { TrafficFlowExportRoot } from '../traffic-flow-export/traffic-flow-export-root.component'
import { TrafficFlowFiltersRoot } from '../traffic-flow-filters/traffic-flow-filters-root.component'
import { TrafficFlowAbsoluteChart } from '../traffic-flow-absolute-chart'
import { useGetTrafficFlowSubmit } from '../../hooks/use-post-traffic-flow-submit.hook'

export function TrafficFlowAbsoluteClient() {
  const [selectedSeries, setSelectedSeries] = useState<string[]>([])
  const [selectedModels, setSelectedModels] = useState<(string | number)[]>([])
  const [granularity, setGranularity] =
    useState<TrafficFlowGranularityInterface>('hour')

  const initialSettings: TrafficFlowFiltersInterface = {
    granularity
  }

  const { trafficsFlows, vehiclesTypes, isLoading, isFetched, fetchTrafficFlow } =
    useTrafficFlowData(initialSettings)
  const { handleExport } = useTrafficFlowExport(
    trafficsFlows,
    vehiclesTypes,
    granularity
  )
  const series = useTrafficFlowAbsoluteSeries(trafficsFlows, vehiclesTypes)
  const chartData = useTrafficChartAdapter(trafficsFlows?.volume_absolute ?? [])
  const { onAction } = useGetTrafficFlowSubmit()

  const trafficFlowModels = useMemo(() => {
    if (!trafficsFlows) return []
    return Object.keys(trafficsFlows).map((key) => ({
      id: key,
      label: key.replaceAll('_', ' '),
      value: key
    }))
  }, [trafficsFlows])

  useEffect(() => {
    setSelectedSeries(series.map((s) => s.key))
  }, [series])

  return (
    <>
      <TrafficFlowExportRoot
        models={trafficFlowModels}
        selectedModels={selectedModels}
        setSelectedModels={setSelectedModels}
        onExport={handleExport}
      />

      <TrafficFlowFiltersRoot
        initialSettings={initialSettings}
        onSubmit={(filters: TrafficFlowFiltersInterface) =>
          onAction(filters, (filters) => {
            setGranularity(filters.granularity)
          })
        }
      />

      <TrafficFlowAbsoluteChart.Provider
        data={chartData}
        isFetched={isFetched}
        series={series}
        selectedSeries={selectedSeries}
        onSeriesChange={setSelectedSeries}
        granularity={granularity}
      >
        <TrafficFlowAbsoluteChart.Root
          isLoading={isLoading}
          onRefresh={fetchTrafficFlow}
          onExport={() => handleExport('volume_absolute')}
        />
      </TrafficFlowAbsoluteChart.Provider>
    </>
  )
}
