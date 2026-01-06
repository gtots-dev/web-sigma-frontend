import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { PostActivityReportRouterApiGateway } from '../../domain/gateways/post-activity-report-router-api.gateway'
import type { ActivityReportFiltersInterface } from '@/modules/activity-report/domain/interfaces/activity-report-filters.interface'
import type { PaginationInterface } from '@/modules/shared/domain/interfaces/pagination.interfaces'
import type { ActivityReportInterface } from '@/modules/activity-report/domain/interfaces/activity-report.interface'

export class PostActivityReportRouterApiService implements PostActivityReportRouterApiGateway {
  constructor(private readonly httpRequest: ExecuteRequest) {}

  getHttpRequestConfig(filters: {
    filters: ActivityReportFiltersInterface
    pagination: PaginationInterface
  }): HttpRequestConfig {
    return {
      method: 'POST',
      url: 'api/activity-report',
      data: filters
    }
  }
  async execute(filters: {
    filters: ActivityReportFiltersInterface
    pagination: PaginationInterface
  }): Promise<{
    data: ActivityReportInterface[]
    meta: PaginationInterface
  }> {
    const settingsAuthHTTP = this.getHttpRequestConfig(filters)
    const { data } = await this.httpRequest.execute<{
      data: {
        data: ActivityReportInterface[]
        meta: PaginationInterface
      }
    }>(settingsAuthHTTP)
    return data.data
  }
}
