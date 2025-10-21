'use client'

import { useEffect, useState, useCallback } from 'react'
import type { LaneEntity } from '../../domain/entities/lane.entity'
import { useLaneStore } from '../stores/lanes.store'

export interface UseTableLanesResult {
  lanes: LaneEntity[]
  loading: boolean
}

export function useTableLanes(): UseTableLanesResult {
  const { lanes, getLanes: getLanesFromStore } = useLaneStore()
  const [loading, setLoading] = useState(true)

  const getLanes = useCallback(async () => {
    setLoading(true)
    await getLanesFromStore()
    setLoading(false)
  }, [getLanesFromStore])

  useEffect(() => {
    getLanes()
  }, [getLanes])

  return { lanes, loading }
}
