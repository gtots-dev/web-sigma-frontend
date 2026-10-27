import { create } from 'zustand'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { ProcessingUnitStatusInterface } from '@/modules/processing-units/domain/interfaces/processing-unit-status-interface'
import { GetProcessingUnitStatusListRouterApiFactory } from '@/modules/api/infrastructure/factories/get-processing-unit-status-list-router-api.factory'

type StatusProcessingUnitsState = {
  statusList: ProcessingUnitStatusInterface[]
  loading: boolean
  getStatusList: ({ operationId, contractId }: UrlParams) => Promise<void>
}

export const useStatusProcessingUnitsStore = create<StatusProcessingUnitsState>(
  (set) => ({
    statusList: [],
    loading: false,

    getStatusList: async ({ operationId, contractId }: UrlParams) => {
      set({ loading: true })
      try {
        const getStatusListService =
          GetProcessingUnitStatusListRouterApiFactory.create({
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
  })
)
