import { useMemo } from 'react'
import type { FeaturesInterface } from '@/modules/permissions/domain/interfaces/features.interface'

interface GroupedFeatures {
  name: string
  items: FeaturesInterface[]
}

export function useGroupedFeatures(features?: FeaturesInterface[]) {
  return useMemo(() => {
    if (!features?.length) return []

    const groups = features.reduce<Record<number, GroupedFeatures>>(
      (acc, feature) => {
        const groupId = feature.feature_group?.id ?? 0
        const groupName = feature.feature_group?.name ?? 'Sem grupo'

        if (!acc[groupId]) {
          acc[groupId] = { name: groupName, items: [] }
        }

        acc[groupId].items.push(feature)
        return acc
      },
      {}
    )

    return Object.values(groups)
  }, [features])
}
