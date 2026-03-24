import { PostTrafficFlowRouterApiFactory } from '@/modules/api/infrastructure/factories/post-traffic-flow-router-api.factory'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { create } from 'zustand'
import type { TrafficFlowInterface } from '../../domain/interfaces/traffic-flow.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { TrafficFlowFiltersInterface } from '../../domain/interfaces/traffic-flow-filters.interface'

type TrafficState = {
  trafficsFlows: TrafficFlowInterface | null
  isLoading: boolean
  isFetched: boolean
  error: HttpResponseError | null

  getTrafficFlow: (
    { operationId, contractId }: UrlParams,
    filters: TrafficFlowFiltersInterface
  ) => Promise<void>
}

export const useTrafficFlowStore = create<TrafficState>((set) => ({
  trafficsFlows: null,
  isLoading: false,
  isFetched: false,
  error: null,

  getTrafficFlow: async ({ operationId, contractId }, filters) => {
    set({ isLoading: true, error: null })

    try {
      const api = PostTrafficFlowRouterApiFactory.create({
        operationId,
        contractId
      })

      const { data: trafficsFlows } = await api.execute(filters)

      set({
        trafficsFlows,
        isLoading: false,
        isFetched: true
      })
    } catch (error) {
      set({
        isLoading: false,
        isFetched: true
      })

      if (error instanceof HttpResponseError) {
        set({ error })
        throw error
      }
    }
  }
}))
