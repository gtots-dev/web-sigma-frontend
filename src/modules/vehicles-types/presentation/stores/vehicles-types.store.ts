import { create } from 'zustand'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { VehiclesTypesInterface } from '../../domain/interfaces/vehicle-type.interface'
import { GetVehiclesTypesRouterApiFactory } from '@/modules/api/infrastructure/factories/get-vehicles-types-router-api.factory'

type VehiclesTypeState = {
  vehiclesTypes: VehiclesTypesInterface[]
  getVehiclesTypes: ({ operationId, contractId }: UrlParams) => Promise<void>
}

export const useVehiclesTypeStore = create<VehiclesTypeState>((set) => ({
  vehiclesTypes: [],

  getVehiclesTypes: async ({ operationId, contractId }: UrlParams) => {
    try {
      const getVehiclesTypes = GetVehiclesTypesRouterApiFactory.create({
        operationId,
        contractId
      })
      const { data: vehiclesTypes } = await getVehiclesTypes.execute()
      set({ vehiclesTypes })
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  }
}))
