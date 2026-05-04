'use client'

import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useParams } from 'next/navigation'
import type { VehicleTypeEntity } from '../../domain/entities/vehicle-types.entity'
import { useVehiclesTypeStore } from '../stores/vehicles-types.store'
import { useTwoFactorChallenge } from '@/modules/two-factor/presentation/contexts/two-factor-challenge.context'

export function usePostVehicleTypeSubmit() {
  const { getVehiclesTypes, postVehicleType } = useVehiclesTypeStore()
  const { operationId, contractId }: UrlParams = useParams()
  const { challenge } = useTwoFactorChallenge()

  const onAction = useCallback(
    async (
      vehicleType: VehicleTypeEntity,
      onSuccess: VoidFunction
    ): Promise<void> => {
      const twoFactorCode = await challenge()
      if (!twoFactorCode) return

      try {
        await postVehicleType({ operationId, contractId }, vehicleType)
        toast({
          title: 'Tipo do Veículo adicionado com sucesso!',
          variant: 'success'
        })
        await getVehiclesTypes({ operationId, contractId })
        onSuccess?.()
      } catch (error) {
        if (error instanceof HttpResponseError) {
          toast({
            title: 'Erro ao adicionar o Tipo do Veículo',
            description: error.message,
            variant: 'destructive'
          })
        }
      }
    },
    [getVehiclesTypes, operationId, contractId, challenge]
  )

  return { onAction }
}
