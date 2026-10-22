import { create } from 'zustand'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { GetProcessingUnitStatusListRouterApiFactory } from '@/modules/api/infrastructure/factories/get-processing-unit-status-list-router-api.factory'
import { GetLanesStatusListRouterApiFactory } from '@/modules/api/infrastructure/factories/get-lanes-status-list-router-api.factory'
import type { StatusItemInterface } from '../../domain/interfaces/status-item.interface'

type StatusState = {
  statusList: StatusItemInterface[]
  loading: boolean
  getStatusList: (params: UrlParams) => Promise<void>
}

export const useStatusStore = create<StatusState>((set) => ({
  statusList: [],
  loading: false,

  getStatusList: async ({ operationId, contractId }: UrlParams) => {
    set({ loading: true })
    try {
      const upService = GetProcessingUnitStatusListRouterApiFactory.create({
        operationId,
        contractId
      })
      const laneService = GetLanesStatusListRouterApiFactory.create({
        operationId,
        contractId
      })

      const [upRes, laneRes] = await Promise.allSettled([
        upService.execute(),
        laneService.execute()
      ])

      const ups: StatusItemInterface[] =
        upRes.status === 'fulfilled' && upRes.value?.data
          ? upRes.value.data.map((item) => ({
              id: item.id,
              code: item.code,
              description: item.description,
              origin: 'UP' as const
            }))
          : []

      const lanes: StatusItemInterface[] =
        laneRes.status === 'fulfilled' && laneRes.value?.data
          ? laneRes.value.data.map((item) => ({
              id: item.id,
              code: item.code,
              description: item.description,
              origin: 'LANE' as const
            }))
          : []

      set({ statusList: [...ups, ...lanes] })
    } catch (error) {
      if (error instanceof HttpResponseError) throw error
    } finally {
      set({ loading: false })
    }
  }
}))
