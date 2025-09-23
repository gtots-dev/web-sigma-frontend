import type { ActivityReportFiltersInterface } from '@/modules/activity-report/domain/interfaces/activity-report-filters.interface'
import type { ActivityReportInterface } from '@/modules/activity-report/domain/interfaces/activity-report.interface'
import type { PaginationInterface } from '@/modules/shared/domain/interfaces/pagination.interfaces'

export interface PostActivityReportRouterApiServiceInterface {
  execute(filters: {
    filters: ActivityReportFiltersInterface
    pagination: PaginationInterface
  }): Promise<{
    data: ActivityReportInterface[]
    meta: PaginationInterface
  }>
}
