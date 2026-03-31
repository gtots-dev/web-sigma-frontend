'use client'

import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useParams } from 'next/navigation'
import type { VehicleTypeEntity } from '../../domain/entities/vehicle-types.entity'
import { useVehiclesTypeStore } from '../stores/vehicles-types.store'

export function usePatchVehicleTypeSubmit() {
  const { operationId, contractId }: UrlParams = useParams()
  const { getVehiclesTypes, patchVehicleType } = useVehiclesTypeStore()

  const onAction = useCallback(
    async (
      vehicleType: VehicleTypeEntity,
      onSuccess: VoidFunction
    ): Promise<void> => {
      try {
        await patchVehicleType(
          { operationId, contractId, VehicleTypeId: String(vehicleType.id) },
          vehicleType
        )
        toast({
          title: 'Tipos de veículos adicionado com sucesso!',
          variant: 'success'
        })
        await getVehiclesTypes({ operationId, contractId })
        onSuccess?.()
      } catch (error) {
        if (error instanceof HttpResponseError) {
          toast({
            title: 'Erro ao adicionar o tipos de veículos',
            description: error.message,
            variant: 'destructive'
          })
        }
      }
    },
    [getVehiclesTypes, patchVehicleType, operationId, contractId]
  )

  return { onAction }
}
