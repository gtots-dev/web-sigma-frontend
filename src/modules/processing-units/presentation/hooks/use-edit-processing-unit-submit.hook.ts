import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { ProcessingUnitEntity } from '../../domain/entities/processing-unit.entity'
import { useProcessingUnitStore } from '../stores/processing-units.store'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useParams } from 'next/navigation'
import { useTwoFactorChallenge } from '@/modules/two-factor/presentation/contexts/two-factor-challenge.context'

export function useEditProcessingUnitSubmit() {
  const { getProcessingUnits, patchProcessingUnit } = useProcessingUnitStore()
  const { operationId, contractId }: UrlParams = useParams()
  const { challenge } = useTwoFactorChallenge()

  const onAction = useCallback(
    async (
      processingUnit: ProcessingUnitEntity,
      onSuccess: VoidFunction
    ): Promise<void> => {
      const twoFactorCode = await challenge()
      if (!twoFactorCode) return

      try {
        await patchProcessingUnit({ operationId, contractId }, processingUnit)
        toast({
          title: 'Unidade de processamento atualizado com sucesso!',
          variant: 'success'
        })
        await getProcessingUnits({ operationId, contractId })
        onSuccess?.()
      } catch (error) {
        if (error instanceof HttpResponseError) {
          toast({
            title: 'Erro ao atualizar a unidade de processamento',
            description: error.message,
            variant: 'destructive'
          })
        }
      }
    },
    [
      getProcessingUnits,
      patchProcessingUnit,
      operationId,
      contractId,
      challenge
    ]
  )

  return { onAction }
}
