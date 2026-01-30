'use client'

import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useParams } from 'next/navigation'
import type { PointEntity } from '../../domain/entities/point.entity'
import { usePointStore } from '../stores/point.store'

export function usePostPointSubmit() {
  const { getPoints, addPoint } = usePointStore()
  const { operationId, contractId }: UrlParams = useParams()

  const onAction = useCallback(
    async (point: PointEntity, onSuccess: VoidFunction): Promise<void> => {
      try {
        await addPoint({ operationId, contractId }, point)
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
            description: error.message,
            variant: 'destructive'
          })
        }
      }
    },
    [getPoints, addPoint, operationId, contractId]
  )

  return { onAction }
}
