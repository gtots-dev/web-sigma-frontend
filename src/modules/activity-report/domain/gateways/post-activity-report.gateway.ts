import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { ActivityReportFiltersInterface } from '../interfaces/activity-report-filters.interface'
import type { PaginationInterface } from '@/modules/shared/domain/interfaces/pagination.interfaces'
import type { ActivityReportInterface } from '../interfaces/activity-report.interface'

export interface PostActivityReportGateway {
  execute(
    token: TokenEntities,
    filters: {
      filters: ActivityReportFiltersInterface
      pagination: PaginationInterface
    }
  ): Promise<ActivityReportInterface>
}
