'use client'

import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { useRestrictionStore } from '../stores/restrictions.store'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useParams } from 'next/navigation'
import type { RestrictionEntity } from '../../domain/entities/restriction.entity'

export function usePostRestrictionSubmit() {
  const { operationId, contractId }: UrlParams = useParams()
  const { getRestrictions, postRestriction } = useRestrictionStore()

  const onAction = useCallback(
    async (
      data: RestrictionEntity,
      onSuccess: VoidFunction
    ): Promise<void> => {
      try {
        await postRestriction(
          { operationId, contractId },
          data
        )
        toast({
          title: 'Restrição criada com sucesso!',
          variant: 'success'
        })
        await getRestrictions({ operationId, contractId })
        onSuccess?.()
      } catch (error) {
        if (error instanceof HttpResponseError) {
          toast({
            title: 'Erro ao criar a restrição',
            description: error.message,
            variant: 'destructive'
          })
        }
      }
    },
    [getRestrictions, postRestriction, operationId, contractId]
  )

  return { onAction }
}
