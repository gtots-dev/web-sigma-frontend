import { create } from 'zustand'
import type { InfractionsFiltersInterface } from '../../domain/interfaces/infractions-filters.interface'
import { PostInfractionsRouterApiFactory } from '@/modules/api/infrastructure/factories/post-infractions-router-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { Infraction } from '../../domain/interfaces/infraction.interface'
import { deduplicateInfractions } from '../utils/deduplicate-infractions.util'
import {
  mergeOlderInfractionsBuffer,
  mergeNewerInfractionsBuffer
} from '../utils/merge-infractions-buffer.util'

const PER_PAGE = 50

type InfractionsState = {
  infractions: Infraction[]
  loading: boolean
  loadingOlder: boolean
  loadingNewer: boolean
  hasOlder: boolean
  hasNewer: boolean
  pageStart: number
  pageEnd: number
  bufferLimit: number
  activeFilters?: InfractionsFiltersInterface
  setBufferLimit: (limit: number) => void
  getInitialInfractions: (
    params: UrlParams,
    filters?: InfractionsFiltersInterface
  ) => Promise<void>
  fetchOlder: (params: UrlParams) => Promise<void>
  fetchNewer: (params: UrlParams) => Promise<void>
}

export const useInfractionsStore = create<InfractionsState>((set, get) => ({
  infractions: [],
  loading: false,
  loadingOlder: false,
  loadingNewer: false,
  hasOlder: true,
  hasNewer: false,
  pageStart: 1,
  pageEnd: 1,
  bufferLimit: 200,
  activeFilters: undefined,

  setBufferLimit: (limit: number) => set({ bufferLimit: limit }),

  getInitialInfractions: async (
    params: UrlParams,
    filters?: InfractionsFiltersInterface
  ) => {
    if (get().loading) return

    set({
      loading: true,
      loadingOlder: false,
      loadingNewer: false,
      hasOlder: true,
      hasNewer: false,
      pageStart: 1,
      pageEnd: 1,
      infractions: [],
      activeFilters: filters
    })
    try {
      const svc = PostInfractionsRouterApiFactory.create(params)
      const data = await svc.execute({
        pagination: { page: 1, per_page: PER_PAGE },
        filters
      })
      const uniqueData = deduplicateInfractions(data)
      set({ infractions: uniqueData, hasOlder: data.length === PER_PAGE })
    } catch (err) {
      console.error(err)
    } finally {
      set({ loading: false })
    }
  },

  fetchOlder: async (params: UrlParams) => {
    const {
      infractions,
      loadingOlder,
      loading,
      hasOlder,
      pageEnd,
      activeFilters
    } = get()
    if (loading || loadingOlder || !hasOlder || infractions.length === 0) return

    set({ loadingOlder: true })
    const targetPage = pageEnd + 1

    try {
      const svc = PostInfractionsRouterApiFactory.create(params)
      const older = await svc.execute({
        pagination: { page: targetPage, per_page: PER_PAGE },
        filters: activeFilters
      })

      const currentState = get()
      if (currentState.loading || currentState.pageEnd !== targetPage - 1) {
        return
      }

      if (older.length === 0) {
        set({ hasOlder: false })
        return
      }

      set((state) => {
        if (state.pageEnd !== targetPage - 1) return state
        return mergeOlderInfractionsBuffer(state.infractions, older, {
          pageStart: state.pageStart,
          pageEnd: state.pageEnd,
          targetPage,
          bufferLimit: state.bufferLimit,
          perPage: PER_PAGE
        })
      })
    } catch (err) {
      console.error(err)
    } finally {
      set({ loadingOlder: false })
    }
  },

  fetchNewer: async (params: UrlParams) => {
    const {
      infractions,
      loadingNewer,
      loading,
      hasNewer,
      pageStart,
      activeFilters
    } = get()
    if (
      loading ||
      loadingNewer ||
      !hasNewer ||
      infractions.length === 0 ||
      pageStart <= 1
    )
      return

    set({ loadingNewer: true })
    const targetPage = pageStart - 1

    try {
      const svc = PostInfractionsRouterApiFactory.create(params)
      const newer = await svc.execute({
        pagination: { page: targetPage, per_page: PER_PAGE },
        filters: activeFilters
      })

      const currentState = get()
      if (currentState.loading || currentState.pageStart !== targetPage + 1) {
        return
      }

      if (newer.length === 0) {
        set({ hasNewer: false })
        return
      }

      set((state) => {
        if (state.pageStart !== targetPage + 1) return state
        return mergeNewerInfractionsBuffer(state.infractions, newer, {
          pageStart: state.pageStart,
          pageEnd: state.pageEnd,
          targetPage,
          bufferLimit: state.bufferLimit,
          perPage: PER_PAGE
        })
      })
    } catch (err) {
      console.error(err)
    } finally {
      set({ loadingNewer: false })
    }
  }
}))
