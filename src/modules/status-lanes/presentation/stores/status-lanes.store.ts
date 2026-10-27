import { create } from 'zustand'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { LaneStatusInterface } from '@/modules/lanes/domain/interfaces/lane-status.interface'
import { GetLanesStatusListRouterApiFactory } from '@/modules/api/infrastructure/factories/get-lanes-status-list-router-api.factory'

type StatusLanesState = {
  statusList: LaneStatusInterface[]
  loading: boolean
  getStatusList: ({ operationId, contractId }: UrlParams) => Promise<void>
}

export const useStatusLanesStore = create<StatusLanesState>((set) => ({
  statusList: [],
  loading: false,

  getStatusList: async ({ operationId, contractId }: UrlParams) => {
    set({ loading: true })
    try {
      const getStatusListService = GetLanesStatusListRouterApiFactory.create({
        operationId,
        contractId
      })
      const { data: statusList } = await getStatusListService.execute()
      set({ statusList: statusList ?? [] })
    } catch (error) {
      if (error instanceof HttpResponseError) throw error
    } finally {
      set({ loading: false })
    }
  }
}))
