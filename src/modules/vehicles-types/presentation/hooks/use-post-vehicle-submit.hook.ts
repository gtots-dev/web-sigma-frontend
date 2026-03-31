'use client'

import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useParams } from 'next/navigation'
import type { VehicleEntity } from '../../domain/entities/vehicle-types.entity'
import { useVehiclesTypeStore } from '../stores/vehicles-types.store'

export function usePostVehicleSubmit() {
  const { getVehiclesTypes, postVehicleType } = useVehiclesTypeStore()
  const { operationId, contractId }: UrlParams = useParams()

  const onAction = useCallback(
    async (
      vehicleType: VehicleEntity,
      onSuccess: VoidFunction
    ): Promise<void> => {
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
    [getVehiclesTypes, operationId, contractId]
  )

  return { onAction }
}
