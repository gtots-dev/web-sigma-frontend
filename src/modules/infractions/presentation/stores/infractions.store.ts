import { create } from 'zustand'
import type { Infraction } from '../../domain/interfaces/infractions-websocket.interface'
import { GetInfractionsRouterApiFactory } from '@/modules/api/infrastructure/factories/get-infractions-router-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

type InfractionsState = {
  infractions: Infraction[]
  loading: boolean
  getInfractions: ({ operationId, contractId }: UrlParams) => Promise<void>
}

export const useInfractionsStore = create<InfractionsState>((set) => ({
  infractions: [],
  loading: false,

  getInfractions: async ({ operationId, contractId }: UrlParams) => {
    set({ loading: true })
    try {
      const getInfractions = GetInfractionsRouterApiFactory.create({
        operationId,
        contractId
      })
      const infractions = await getInfractions.execute()
      set({ infractions })
    } catch (error) {
      console.error('Failed to get infractions', error)
    } finally {
      set({ loading: false })
    }
  }
}))
