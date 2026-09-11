'use client'

import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { useViolationStore } from '../stores/violations.store'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useParams } from 'next/navigation'
import type { ViolationEntity } from '../../domain/entities/violation.entity'
import { useTableViolations } from '../contexts/table-violations.context'

export function usePatchViolationSubmit() {
  const { operationId, contractId }: UrlParams = useParams()
  const { getViolations, patchViolation } = useViolationStore()
  const violation = useTableViolations()

  const onAction = useCallback(
    async (
      data: ViolationEntity,
      onSuccess: VoidFunction
    ): Promise<void> => {
      try {
        await patchViolation(
          {
            operationId: String(operationId),
            contractId: String(contractId),
            violationId: String(violation.id)
          },
          data
        )
        toast({
          title: 'Violação atualizada com sucesso!',
          variant: 'success'
        })
        await getViolations({ operationId, contractId })
        onSuccess?.()
      } catch (error) {
        if (error instanceof HttpResponseError) {
          toast({
            title: 'Erro ao atualizar a violação',
            description: error.message,
            variant: 'destructive'
          })
        }
      }
    },
    [getViolations, patchViolation, operationId, contractId, violation.id]
  )

  return { onAction }
}
