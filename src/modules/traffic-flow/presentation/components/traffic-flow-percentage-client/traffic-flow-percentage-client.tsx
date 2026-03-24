'use client'

import { useEffect, useState } from 'react'
import type { TrafficFlowGranularityInterface } from '@/modules/traffic-flow/domain/interfaces/traffic-flow-granularity.interface'
import type { TrafficFlowFiltersInterface } from '@/modules/traffic-flow/domain/interfaces/traffic-flow-filters.interface'
import { useTrafficFlowData } from '../../hooks/use-traffic-flow-data.hook'
import { useTrafficChartAdapter } from '../../hooks/use-traffic-chart-adapter'
import { useTrafficFlowExport } from '../../hooks/use-traffic-flow-export.hook'
import { TrafficFlowPercentageChart } from '../traffic-flow-percentage-chart'
import { useTrafficFlowPercentageSeries } from '../../hooks/use-traffic-flow-percentage-series.hook'

export function TrafficFlowPercentageClient() {
  const [selectedSeries, setSelectedSeries] = useState<string[]>([])
  const [granularity] = useState<TrafficFlowGranularityInterface>('hour')

  const initialSettings: TrafficFlowFiltersInterface = {
    granularity
  }

  const { trafficsFlows, vehiclesTypes, isLoading, fetchTrafficFlow } =
    useTrafficFlowData(initialSettings)
  const { handleExport } = useTrafficFlowExport(
    trafficsFlows,
    vehiclesTypes,
    granularity
  )
  const series = useTrafficFlowPercentageSeries(trafficsFlows, vehiclesTypes)
  const chartData = useTrafficChartAdapter(trafficsFlows.volume_percentage)

  useEffect(() => {
    setSelectedSeries(series.map((s) => s.key))
  }, [series])

  return (
    <>
      <TrafficFlowPercentageChart.Provider
        data={chartData}
        series={series}
        selectedSeries={selectedSeries}
        onSeriesChange={setSelectedSeries}
        granularity={granularity}
      >
        <TrafficFlowPercentageChart.Root
          isLoading={isLoading}
          onRefresh={fetchTrafficFlow}
          onExport={() => handleExport('volume_percentage')}
        />
      </TrafficFlowPercentageChart.Provider>
    </>
  )
}
