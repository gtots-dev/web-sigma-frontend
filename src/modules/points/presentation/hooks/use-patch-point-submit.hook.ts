'use client'

import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useParams } from 'next/navigation'
import type { PointEntity } from '../../domain/entities/point.entity'
import { usePointStore } from '../stores/point.store'
import { useTwoFactorChallenge } from '@/modules/two-factor/presentation/contexts/two-factor-challenge.context'

export function usePatchPointSubmit() {
  const { operationId, contractId }: UrlParams = useParams()
  const { getPoints, patchPoint } = usePointStore()
  const { challenge } = useTwoFactorChallenge()

  const onAction = useCallback(
    async (point: PointEntity, onSuccess: VoidFunction): Promise<void> => {
      const twoFactorCode = await challenge()
      if (!twoFactorCode) return

      try {
        await patchPoint({ operationId, contractId }, point)
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
    [getPoints, patchPoint, operationId, contractId, challenge]
  )

  return { onAction }
}
