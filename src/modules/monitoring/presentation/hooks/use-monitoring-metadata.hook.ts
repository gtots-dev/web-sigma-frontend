'use client'

import { useState, useEffect } from 'react'
import { usePointStore } from '@/modules/points/presentation/stores/point.store'
import { useLaneStore } from '@/modules/lanes/presentation/stores/lanes.store'
import { useProcessingUnitStore } from '@/modules/processing-units/presentation/stores/processing-units.store'
import { useMonitoringUnifiedNodes, UnifiedMonitoringNode } from './use-monitoring-unified-nodes.hook'

export type { UnifiedMonitoringNode }

export function useMonitoringMetadata(operationId: string, contractId: string) {
  const [isLoading, setIsLoading] = useState(true)
  const { points, getPoints } = usePointStore()
  const { contractLanes, getContractLanes } = useLaneStore()
  const { processingUnits, getProcessingUnits } = useProcessingUnitStore()

  useEffect(() => {
    if (operationId && contractId) {
      setIsLoading(true)
      Promise.all([
        getPoints({ operationId, contractId }),
        getContractLanes({ operationId, contractId }),
        getProcessingUnits({ operationId, contractId })
      ]).finally(() => {
        setIsLoading(false)
      })
    }
  }, [operationId, contractId, getPoints, getContractLanes, getProcessingUnits])

  const unifiedNodes = useMonitoringUnifiedNodes({
    points,
    contractLanes,
    processingUnits,
    contractId
  })

  return {
    unifiedNodes,
    isLoading
  }
}

