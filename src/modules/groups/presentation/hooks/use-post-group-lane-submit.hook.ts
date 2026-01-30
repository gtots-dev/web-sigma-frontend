'use client'

import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { useParams } from 'next/navigation'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useGroupStore } from '../stores/group.store'
import type { GroupLaneInterface } from '../../domain/interfaces/group-lane.interface'
import { useLaneStore } from '@/modules/lanes/presentation/stores/lanes.store'
import { useTableGroup } from '../contexts/table-group.context'

export function usePostGroupLaneSubmit() {
  const { operationId, contractId }: UrlParams = useParams()
  const { group } = useTableGroup()
  const { contractLanes } = useLaneStore()
  const { getGroups, postGroupLane, deleteGroupLane } = useGroupStore()

  const onAction = useCallback(
    async (
      { laneId: formLaneIds }: GroupLaneInterface,
      onSuccess?: VoidFunction
    ) => {
      try {
        const apiLanesSelected = contractLanes
          .filter((item) => item.group_id.includes(group.id))
          .map((item) => item.lane.id)

        const toAdd = formLaneIds.filter((id) => !apiLanesSelected.includes(id))
        let toDelete = apiLanesSelected.filter(
          (id) => !formLaneIds.includes(id)
        )

        for (const laneId of toAdd) {
          await postGroupLane(
            { operationId, contractId, groupId: String(group.id) },
            laneId
          )
        }

        if (toAdd.length > 0) {
          await getGroups({ contractId, operationId })

          const freshApiLanesSelected = contractLanes
            .filter((item) => item.group_id.includes(group.id))
            .map((item) => item.lane.id)

          toDelete = freshApiLanesSelected.filter(
            (id) => !formLaneIds.includes(id)
          )
        }

        for (const laneId of toDelete) {
          await deleteGroupLane({
            operationId,
            contractId,
            groupId: String(group.id),
            laneId: String(laneId)
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
      postGroupLane,
      deleteGroupLane,
      getGroups,
      contractLanes,
      group?.id,
      operationId,
      contractId
    ]
  )

  return { onAction }
}
