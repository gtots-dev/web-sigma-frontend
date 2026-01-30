import type { ActivityReportFiltersInterface } from '@/modules/activity-report/domain/interfaces/activity-report-filters.interface'
import type { ActivityReportInterface } from '@/modules/activity-report/domain/interfaces/activity-report.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { PaginationInterface } from '@/modules/shared/domain/interfaces/pagination.interfaces'

export interface PostActivityReportRouterApiGateway {
  execute(filters: {
    filters: ActivityReportFiltersInterface
    pagination: PaginationInterface
  }): Promise<HttpResponseInterface<{
    data: ActivityReportInterface[]
    meta: PaginationInterface
  }>>
}
