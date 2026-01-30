'use client'

import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { useParams } from 'next/navigation'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useGroupStore } from '../stores/group.store'
import type { GroupPointInterface } from '../../domain/interfaces/group-point.interface.ts'
import { usePointStore } from '@/modules/points/presentation/stores/point.store'
import { useTableGroup } from '../contexts/table-group.context'

export function usePostGroupPointSubmit() {
  const { operationId, contractId }: UrlParams = useParams()
  const { group } = useTableGroup()
  const { points } = usePointStore()
  const { getGroups, postGroupPoint, deleteGroupPoint } = useGroupStore()

  const onAction = useCallback(
    async (
      { pointId: formPointIds }: GroupPointInterface,
      onSuccess?: VoidFunction
    ) => {
      try {
        const apiPointsSelected = points
          .filter((item) => item.group_id.includes(group.id))
          .map((item) => item.point.id)

        const toAdd = formPointIds.filter(
          (id) => !apiPointsSelected.includes(id)
        )
        let toDelete = apiPointsSelected.filter(
          (id) => !formPointIds.includes(id)
        )

        for (const pointId of toAdd) {
          await postGroupPoint(
            { operationId, contractId, groupId: String(group.id) },
            pointId
          )
        }

        if (toAdd.length > 0) {
          await getGroups({ contractId, operationId })

          const freshApiPointsSelected = points
            .filter((item) => item.group_id.includes(group.id))
            .map((item) => item.point.id)

          toDelete = freshApiPointsSelected.filter(
            (id) => !formPointIds.includes(id)
          )
        }

        for (const pointId of toDelete) {
          await deleteGroupPoint({
            operationId,
            contractId,
            groupId: String(group.id),
            pointId: String(pointId)
          })
        }

        await getGroups({ contractId, operationId })

        toast({
          title: 'Grupo atualizado com sucesso!',
          variant: 'success'
        })

        onSuccess?.()
      } catch (error) {
        if (error instanceof HttpResponseError) {
          toast({
            title: 'Erro ao atualizar o grupo',
            description: error.message,
            variant: 'destructive'
          })
        }
      }
    },
    [
      postGroupPoint,
      deleteGroupPoint,
      getGroups,
      points,
      group?.id,
      operationId,
      contractId
    ]
  )

  return { onAction }
}
