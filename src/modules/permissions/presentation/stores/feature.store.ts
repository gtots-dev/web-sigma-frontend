import { create } from 'zustand'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { FeaturesInterface } from '../../domain/interfaces/features.interface'
import { GetFeatureRouterApiFactory } from '@/modules/api/infrastructure/factories/get-feature-router-api.factory'

type FeatureState = {
  features: FeaturesInterface[] | []

  getFeatures: () => Promise<void>
}

export const useFeatureStore = create<FeatureState>((set) => ({
  features: [],

  getFeatures: async () => {
    try {
      const getFeaturesRouterApiFactory = GetFeatureRouterApiFactory.create()
      const features = await getFeaturesRouterApiFactory.execute()
      set({ features })
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  }
}))
