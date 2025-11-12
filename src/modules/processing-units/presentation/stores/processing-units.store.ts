import { create } from 'zustand'
import type { ProcessingUnitEntity } from '../../domain/entities/processing-unit.entity'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { PostProcessingUnitRouterApiFactory } from '@/modules/api/infrastructure/factories/post-processing-unit-router-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { GetProcessingUnitRouterApiFactory } from '@/modules/api/infrastructure/factories/get-processing-unit-router-api.factory'
import { PatchProcessingUnitRouterApiFactory } from '@/modules/api/infrastructure/factories/patch-processing-unit-router-api.factory'
import { PatchProcessingUnitStatusRouterApiFactory } from '@/modules/api/infrastructure/factories/patch-processing-unit-status-router-api.factory'
import type { ProcessingUnitEnableAndDisableInterface } from '../../domain/interfaces/processing-unit-enable-and-disable.interface'

type ProcessingUnitState = {
  processingUnits: ProcessingUnitEntity[]
  getProcessingUnits: ({ operationId, contractId }: UrlParams) => Promise<void>
  addProcessingUnit: (
    { operationId, contractId }: UrlParams,
    processingUnit: ProcessingUnitEntity
  ) => Promise<void>
  patchProcessingUnit: (
    { operationId, contractId }: UrlParams,
    processingUnit: ProcessingUnitEntity
  ) => Promise<void>
  patchProcessingUnitStatus: (
    { operationId, contractId, processingUnitId }: UrlParams,
    processingUnitEnableAndDIsable: ProcessingUnitEnableAndDisableInterface
  ) => Promise<void>
}

export const useProcessingUnitStore = create<ProcessingUnitState>((set) => ({
  processingUnits: [],

  addProcessingUnit: async (
    { operationId, contractId }: UrlParams,
    processingUnit: ProcessingUnitEntity
  ) => {
    try {
      const postProcessingUnitRouterApiFactory =
        PostProcessingUnitRouterApiFactory.create({ operationId, contractId })
      await postProcessingUnitRouterApiFactory.execute(processingUnit)
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  },

  getProcessingUnits: async ({ operationId, contractId }: UrlParams) => {
    try {
      const getProcessingUnit = GetProcessingUnitRouterApiFactory.create({
        operationId,
        contractId
      })
      const processingUnits = await getProcessingUnit.execute()
      set({ processingUnits })
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  },

  patchProcessingUnit: async (
    { operationId, contractId }: UrlParams,
    processingUnit: ProcessingUnitEntity
  ) => {
    try {
      const patchProcessingUnitRouterApiFactory =
        PatchProcessingUnitRouterApiFactory.create({ operationId, contractId })
      await patchProcessingUnitRouterApiFactory.execute(processingUnit)
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  },

  patchProcessingUnitStatus: async (
    { operationId, contractId, processingUnitId }: UrlParams,
    processingUnitEnableAndDIsable: ProcessingUnitEnableAndDisableInterface
  ) => {
    try {
      const patchProcessingUnitStatusRouterApiFactory =
        PatchProcessingUnitStatusRouterApiFactory.create({
          operationId,
          contractId,
          processingUnitId
        })
      await patchProcessingUnitStatusRouterApiFactory.execute(
        processingUnitEnableAndDIsable
      )
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  }
}))
