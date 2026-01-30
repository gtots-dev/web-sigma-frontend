'use client'

import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { useParams } from 'next/navigation'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { usePointStore } from '../stores/point.store'
import type { PointLaneInterface } from '../../domain/interfaces/point-lane.interface'
import { useLaneStore } from '@/modules/lanes/presentation/stores/lanes.store'
import { useTablePoint } from '../contexts/table-point.context'

export function usePostPointLaneSubmit() {
  const { operationId, contractId }: UrlParams = useParams()
  const { point } = useTablePoint()
  const { contractLanes } = useLaneStore()
  const { getPoints, postPointLane, deletePointLane } = usePointStore()

  const onAction = useCallback(
    async (
      { laneId: formLaneIds }: PointLaneInterface,
      onSuccess?: VoidFunction
    ) => {
      try {
        const apiLanesSelected = contractLanes
          .filter((item) => item.point_id === point.id)
          .map((item) => item.lane.id)

        const toAdd = formLaneIds.filter((id) => !apiLanesSelected.includes(id))
        let toDelete = apiLanesSelected.filter(
          (id) => !formLaneIds.includes(id)
        )

        for (const laneId of toAdd) {
          await postPointLane(
            { operationId, contractId, pointId: String(point.id) },
            laneId
          )
        }

        if (toAdd.length > 0) {
          await getPoints({ contractId, operationId })

          const freshApiLanesSelected = contractLanes
            .filter((item) => item.point_id === point.id)
            .map((item) => item.lane.id)

          toDelete = freshApiLanesSelected.filter(
            (id) => !formLaneIds.includes(id)
          )
        }

        for (const laneId of toDelete) {
          await deletePointLane({
            operationId,
            contractId,
            pointId: String(point.id),
            laneId: String(laneId)
          })
        }

        await getPoints({ contractId, operationId })

        toast({
          title: 'Ponto atualizado com sucesso!',
          variant: 'success'
        })

        onSuccess?.()
      } catch (error) {
        if (error instanceof HttpResponseError) {
          toast({
            title: 'Erro ao atualizar o ponto',
            description: error.message,
            variant: 'destructive'
          })
        }
      }
    },
    [
      postPointLane,
      deletePointLane,
      getPoints,
      contractLanes,
      point?.id,
      operationId,
      contractId
    ]
  )

  return { onAction }
}
