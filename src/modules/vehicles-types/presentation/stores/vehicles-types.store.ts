import { create } from 'zustand'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { VehiclesTypesInterface } from '../../domain/interfaces/vehicle-type.interface'
import { GetVehiclesTypesRouterApiFactory } from '@/modules/api/infrastructure/factories/get-vehicles-types-router-api.factory'
import type { VehicleTypeEntity } from '../../domain/entities/vehicle-types.entity'
import { PostVehicleTypeRouterApiFactory } from '@/modules/api/infrastructure/factories/post-vehicle-type-router-api.factory'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import { PatchVehicleTypeRouterApiFactory } from '@/modules/api/infrastructure/factories/patch-vehicle-type-router-api.factory'

type VehiclesTypeState = {
  vehiclesTypes: VehiclesTypesInterface[]
  getVehiclesTypes: ({ operationId, contractId }: UrlParams) => Promise<void>
  postVehicleType: (
    { operationId, contractId }: UrlParams,
    vehicleType: VehicleTypeEntity
  ) => Promise<HttpResponseInterface<VehicleTypeEntity>>
  patchVehicleType: (
    { operationId, contractId, vehicleTypeId }: UrlParams,
    vehicleType: VehicleTypeEntity
  ) => Promise<HttpResponseInterface<VehicleTypeEntity>>
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
    vehicleType: VehicleTypeEntity
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
  },

  patchVehicleType: async (
    { operationId, contractId, vehicleTypeId }: UrlParams,
    vehicleType: VehicleTypeEntity
  ) => {
    try {
      const patchVehicleTypeRouterApiFactory =
        PatchVehicleTypeRouterApiFactory.create({
          operationId,
          contractId,
          vehicleTypeId
        })
      return await patchVehicleTypeRouterApiFactory.execute(vehicleType)
    } catch (error) {
      if (error instanceof HttpResponseError) throw error
    }
  }
}))
