import { useCallback } from 'react'
import { useLaneStore } from '@/modules/lanes/presentation/stores/lanes.store'
import { usePointStore } from '@/modules/points/presentation/stores/point.store'
import { useGroupStore } from '@/modules/groups/presentation/stores/group.store'

const INFRACTIONS_FILTER_LABELS: Record<string, string> = {
  lane_ids: 'Faixas',
  point_ids: 'Pontos',
  group_ids: 'Grupos',
  date_range: 'Período',
  time_range: 'Horário',
  license_plate: 'Placa',
  infractions: 'Violações',
  status: 'Status'
}

export function useInfractionsFilterResolver() {
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
      return null
    },
    [contractLanes, points, groups]
  )

  return {
    filterLabels: INFRACTIONS_FILTER_LABELS,
    handleValueResolver
  }
}
