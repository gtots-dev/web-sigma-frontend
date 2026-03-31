import { create } from 'zustand'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { VehiclesTypesInterface } from '../../domain/interfaces/vehicle-type.interface'
import { GetVehiclesTypesRouterApiFactory } from '@/modules/api/infrastructure/factories/get-vehicles-types-router-api.factory'
import type { VehicleEntity } from '../../domain/entities/vehicle-types.entity'
import { PostVehicleTypeRouterApiFactory } from '@/modules/api/infrastructure/factories/post-vehicle-type-router-api.factory'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'

type VehiclesTypeState = {
  vehiclesTypes: VehiclesTypesInterface[]
  getVehiclesTypes: ({ operationId, contractId }: UrlParams) => Promise<void>
  postVehicleType: (
    { operationId, contractId }: UrlParams,
    vehicleType: VehicleEntity
  ) => Promise<HttpResponseInterface<VehicleEntity>>
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
  },

  postVehicleType: async (
    { operationId, contractId }: UrlParams,
    vehicleType: VehicleEntity
  ) => {
    try {
      const postVehicleTypeRouterApiFactory =
        PostVehicleTypeRouterApiFactory.create({
          operationId,
          contractId
        })
      return await postVehicleTypeRouterApiFactory.execute(vehicleType)
    } catch (error) {
      if (error instanceof HttpResponseError) throw error
    }
  }
}))
