import { useCallback } from 'react'
import { useLaneStore } from '@/modules/lanes/presentation/stores/lanes.store'
import { usePointStore } from '@/modules/points/presentation/stores/point.store'
import { useGroupStore } from '@/modules/groups/presentation/stores/group.store'

const TRAFFIC_FLOW_FILTER_LABELS: Record<string, string> = {
  point_ids: 'Pontos',
  lane_ids: 'Faixas',
  group_ids: 'Grupos',
  granularity: 'Granularidade',
  date_range: 'Período',
  time_range: 'Horário'
}

const GRANULARITY_LABELS: Record<string, string> = {
  day: 'Dia',
  hour: 'Hora',
  month: 'Mês',
  year: 'Ano'
}

export function useTrafficFlowFilterResolver() {
  const { contractLanes } = useLaneStore()
  const { points } = usePointStore()
  const { groups } = useGroupStore()

  const handleValueResolver = useCallback(
    (key: string, val: unknown) => {
      if (key === 'lane_ids') {
        const item = contractLanes.find((l) => l.lane.id === Number(val))
        return item?.lane.name
      }
      if (key === 'point_ids') {
        const item = points.find((p) => p.point.id === Number(val))
        return item?.point.name
      }
      if (key === 'group_ids') {
        const item = groups.find((g) => g.group.id === Number(val))
        return item?.group.name
      }
      if (key === 'granularity' && typeof val === 'string') {
        return GRANULARITY_LABELS[val] ?? val
      }
      return null
    },
    [contractLanes, points, groups]
  )

  return {
    filterLabels: TRAFFIC_FLOW_FILTER_LABELS,
    handleValueResolver
  }
}
