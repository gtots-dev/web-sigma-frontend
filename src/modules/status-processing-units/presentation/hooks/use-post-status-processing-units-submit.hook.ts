'use client'

import { useCallback, useState } from 'react'
import { useParams } from 'next/navigation'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { PostStatusProcessingUnitIgnoreRouterApiFactory } from '@/modules/api/infrastructure/factories/post-status-processing-unit-ignore-router-api.factory'
import { DeleteStatusProcessingUnitIgnoreFactory } from '@/modules/api/infrastructure/factories/delete-status-processing-unit-ignore-router-api.factory'

interface SubmitParams {
  statusId: number
  statusCode?: string
  initialProcessingUnitIds: number[]
  ignoreMap: Map<number, number>
  selectedProcessingUnitIds: number[]
  onSuccess?: VoidFunction
}

export function usePostStatusProcessingUnitsSubmit() {
  const { operationId, contractId }: UrlParams = useParams()
  const [submitting, setSubmitting] = useState(false)

  const onAction = useCallback(
    async ({
      statusId,
      statusCode,
      initialProcessingUnitIds,
      ignoreMap,
      selectedProcessingUnitIds,
      onSuccess
    }: SubmitParams) => {
      setSubmitting(true)
      try {
        const toAdd = selectedProcessingUnitIds.filter(
          (id) => !initialProcessingUnitIds.includes(id)
        )
        const toDelete = initialProcessingUnitIds.filter(
          (id) => !selectedProcessingUnitIds.includes(id)
        )

        for (const upId of toAdd) {
          const postService =
            PostStatusProcessingUnitIgnoreRouterApiFactory.create({
              operationId,
              contractId,
              upId: String(upId)
            })
          await postService.execute({ up_status_list_id: statusId })
        }

        for (const upId of toDelete) {
          const ignoreId = ignoreMap.get(upId)
          if (ignoreId) {
            const deleteService =
              DeleteStatusProcessingUnitIgnoreFactory.create({
                operationId,
                contractId,
                upId: String(upId),
                ignoreId: String(ignoreId)
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
