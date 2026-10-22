'use client'

import { useCallback, useState } from 'react'
import { useParams } from 'next/navigation'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { LaneWithPointAndGroupInterface } from '@/modules/lanes/domain/interfaces/lane-with-point-and-group.interface'
import { PostStatusLaneIgnoreRouterApiFactory } from '@/modules/api/infrastructure/factories/post-status-lane-ignore-router-api.factory'
import { DeleteStatusLaneIgnoreRouterApiFactory } from '@/modules/api/infrastructure/factories/delete-status-lane-ignore-router-api.factory'
import type { LaneIgnoreInfo } from './use-status-lane-ignores.hook'

interface SubmitParams {
  statusId: number
  statusCode?: string
  contractLanes: LaneWithPointAndGroupInterface[]
  initialLaneIds: number[]
  ignoreMap: Map<number, LaneIgnoreInfo>
  selectedLaneIds: number[]
  onSuccess?: VoidFunction
}

export function usePostStatusLanesSubmit() {
  const { operationId, contractId }: UrlParams = useParams()
  const [submitting, setSubmitting] = useState(false)

  const onAction = useCallback(
    async ({
      statusId,
      statusCode,
      contractLanes,
      initialLaneIds,
      ignoreMap,
      selectedLaneIds,
      onSuccess
    }: SubmitParams) => {
      setSubmitting(true)
      try {
        const toAdd = selectedLaneIds.filter(
          (id) => !initialLaneIds.includes(id)
        )
        const toDelete = initialLaneIds.filter(
          (id) => !selectedLaneIds.includes(id)
        )

        // Mapa auxiliar para obter upId de cada lane
        const laneUpMap = new Map<number, number>()
        for (const item of contractLanes) {
          const upId = item.lane.up_id ?? item.up_id
          if (upId) {
            laneUpMap.set(item.lane.id, upId)
          }
        }

        for (const laneId of toAdd) {
          const upId = laneUpMap.get(laneId)
          if (!upId) continue

          const postService = PostStatusLaneIgnoreRouterApiFactory.create({
            operationId,
            contractId,
            upId: String(upId),
            laneId: String(laneId)
          })
          await postService.execute({ lane_status_list_id: statusId })
        }

        for (const laneId of toDelete) {
          const info = ignoreMap.get(laneId)
          if (info) {
            const deleteService = DeleteStatusLaneIgnoreRouterApiFactory.create({
              operationId,
              contractId,
              upId: String(info.upId),
              laneId: String(laneId),
              ignoreId: String(info.ignoreId)
            })
            await deleteService.execute()
          }
        }

        toast({
          title: 'Regras de exceção atualizadas com sucesso!',
          description: statusCode
            ? `As configurações para o status "${statusCode}" foram salvas.`
            : undefined,
          variant: 'success'
        })

        onSuccess?.()
      } catch (error) {
        if (error instanceof HttpResponseError) {
          toast({
            title: 'Erro ao atualizar regras de status',
            description: error.message,
            variant: 'destructive'
          })
        } else {
          toast({
            title: 'Erro inesperado',
            description: 'Ocorreu um erro ao salvar as alterações.',
            variant: 'destructive'
          })
        }
      } finally {
        setSubmitting(false)
      }
    },
    [operationId, contractId]
  )

  return { onAction, submitting }
}
