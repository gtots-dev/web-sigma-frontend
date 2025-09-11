import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { ActivityReportFiltersInterface } from './activity-report-filters.interface'
import type { PaginationInterface } from '@/modules/shared/domain/interfaces/pagination.interfaces'

export interface PostActivityReportServiceInterface {
  execute(
    token: TokenEntities,
    filters: {
      filters: ActivityReportFiltersInterface
      pagination: PaginationInterface
    }
  ): Promise<any>
}
