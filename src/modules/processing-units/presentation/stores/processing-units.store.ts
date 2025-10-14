import { create } from 'zustand'
import type { ProcessingUnitEntity } from '../../domain/entities/processing-unit.entity'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { PostProcessingUnitRouterApiFactory } from '@/modules/api/infrastructure/factories/post-processing-unit-router-api.factory'

type ProcessingUnitState = {
  processingUnits: ProcessingUnitEntity[]
  getProcessingUnits: () => Promise<void>
  addProcessingUnit: (processingUnit: ProcessingUnitEntity) => Promise<void>
}

export const useProcessingUnitStore = create<ProcessingUnitState>((set) => ({
  processingUnits: [],

  addProcessingUnit: async (processingUnit: ProcessingUnitEntity) => {
    try {
      const postProcessingUnitRouterApiFactory =
        PostProcessingUnitRouterApiFactory.create()
      postProcessingUnitRouterApiFactory.execute(processingUnit)
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  },

  getProcessingUnits: async () => {
    try {
      const processingUnits = []
      set({ processingUnits })
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  }
}))
