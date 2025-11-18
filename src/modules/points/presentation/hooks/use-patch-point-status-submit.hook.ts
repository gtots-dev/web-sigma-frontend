'use client'

import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useParams } from 'next/navigation'
import type { PointEnableAndDisableInterface } from '../../domain/interfaces/point-enable-and-disable.interface'
import { usePointStore } from '../stores/point.store'

export function usePatchPointStatusSubmit() {
  const { operationId, contractId }: UrlParams = useParams()
  const { getPoints, patchPointStatus } = usePointStore()

  const onAction = useCallback(
    async (
      point: PointEnableAndDisableInterface,
      onSuccess: VoidFunction
    ): Promise<void> => {
      try {
        await patchPointStatus({ operationId, contractId }, point)
        toast({
          title: 'Ponto adicionado com sucesso!',
          variant: 'success'
        })
        await getPoints({ operationId, contractId })
        onSuccess?.()
      } catch (error) {
        if (error instanceof HttpResponseError) {
          toast({
            title: 'Erro ao adicionar o ponto',
            description:
              'Ocorreu um problema ao tentar adicionar o ponto. Verifique e tente novamente',
            variant: 'destructive'
          })
        }
      }
    },
    [getPoints, patchPointStatus, operationId, contractId]
  )

  return { onAction }
}
