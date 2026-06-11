import { create } from 'zustand'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { PostActivityReportRouterApiFactory } from '@/modules/api/infrastructure/factories/post-activity-report-router-api.factory'
import type { ActivityReportFiltersInterface } from '../../domain/interfaces/activity-report-filters.interface'
import type { PaginationInterface } from '@/modules/shared/domain/interfaces/pagination.interfaces'
import type { ActivityReportInterface } from '../../domain/interfaces/activity-report.interface'

type UserState = {
  logs: {
    data: ActivityReportInterface[]
    meta: PaginationInterface
  }
  loading: boolean
  getActivityReport: (filters: {
    filters: ActivityReportFiltersInterface
    pagination: PaginationInterface
  }) => Promise<void>
}

export const useActivityReportStore = create<UserState>((set) => ({
  logs: {
    data: [],
    meta: null
  },
  loading: false,
  getActivityReport: async (filters: {
    filters: ActivityReportFiltersInterface
    pagination: PaginationInterface
  }) => {
    set({ loading: true })
    try {
      const postActivityReportRouterApiFactory =
        PostActivityReportRouterApiFactory.create()
      const { data: logs } =
        await postActivityReportRouterApiFactory.execute(filters)
      set({
        logs
      })
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    } finally {
      set({ loading: false })
    }
  }
}))
