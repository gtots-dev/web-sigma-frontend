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
        const formLanesSelected = formLaneIds || []

        const apiLanesSelected = contractLanes
          .filter((item) => item.point_id !== null)
          .map((item) => item.lane.id)

        const toAdd = formLanesSelected.filter(
          (id) => !apiLanesSelected.includes(id)
        )
        const toDelete = apiLanesSelected.filter(
          (id) => !formLanesSelected.includes(id)
        )

        for (const laneId of toAdd) {
          await postPointLane(
            { operationId, contractId, pointId: String(point.id) },
            laneId
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
            description:
              'Ocorreu um problema ao tentar atualizar. Verifique e tente novamente',
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
