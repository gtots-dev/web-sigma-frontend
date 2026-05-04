import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { PostActivityReportGateway } from '../../domain/gateways/post-activity-report.gateway'
import type { ActivityReportFiltersInterface } from '../../domain/interfaces/activity-report-filters.interface'
import type { PaginationInterface } from '@/modules/shared/domain/interfaces/pagination.interfaces'
import type { ActivityReportInterface } from '../../domain/interfaces/activity-report.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
export class PostActivityReportService implements PostActivityReportGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest) {}

  getHttpRequestConfig(filters: {
    filters: ActivityReportFiltersInterface
    pagination: PaginationInterface
  }): HttpRequestConfig {
    return {
      method: 'POST',
      url: `/logs/search`,
      data: filters,
      requiresAuth: true
    }
  }

  async execute(filters: {
    filters: ActivityReportFiltersInterface
    pagination: PaginationInterface
  }): Promise<HttpResponseInterface<ActivityReportInterface>> {
    const settingsAuthHTTP = this.getHttpRequestConfig(filters)
    return await this.executeRequest.execute(settingsAuthHTTP)
  }
}
