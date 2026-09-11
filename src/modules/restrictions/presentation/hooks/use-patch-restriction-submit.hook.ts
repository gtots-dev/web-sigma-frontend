'use client'

import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { useRestrictionStore } from '../stores/restrictions.store'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useParams } from 'next/navigation'
import type { RestrictionEntity } from '../../domain/entities/restriction.entity'
import { useTableRestrictions } from '../contexts/table-restrictions.context'

export function usePatchRestrictionSubmit() {
  const { operationId, contractId }: UrlParams = useParams()
  const { getRestrictions, patchRestriction } = useRestrictionStore()
  const restriction = useTableRestrictions()

  const onAction = useCallback(
    async (
      data: RestrictionEntity,
      onSuccess: VoidFunction
    ): Promise<void> => {
      try {
        await patchRestriction(
          {
            operationId: String(operationId),
            contractId: String(contractId),
            restrictionId: String(restriction.id)
          },
          data
        )
        toast({
          title: 'Restrição atualizada com sucesso!',
          variant: 'success'
        })
        await getRestrictions({ operationId, contractId })
        onSuccess?.()
      } catch (error) {
        if (error instanceof HttpResponseError) {
          toast({
            title: 'Erro ao atualizar a restrição',
            description: error.message,
            variant: 'destructive'
          })
        }
      }
    },
    [getRestrictions, patchRestriction, operationId, contractId, restriction.id]
  )

  return { onAction }
}
