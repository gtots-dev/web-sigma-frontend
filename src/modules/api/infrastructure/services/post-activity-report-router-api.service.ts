import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { PostActivityReportRouterApiServiceInterface } from '../../domain/interfaces/post-activity-report-router-api-service.interface'
import { HttpResponseActivityReportValidator } from '@/modules/activity-report/domain/validators/http-response-activity-report.validator'
import type { ActivityReportFiltersInterface } from '@/modules/activity-report/domain/interfaces/activity-report-filters.interface'
import type { PaginationInterface } from '@/modules/shared/domain/interfaces/pagination.interfaces'

export class PostActivityReportRouterApiService
  implements PostActivityReportRouterApiServiceInterface
{
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
  }): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(filters)
    const { success, status, data } =
      await this.httpRequest.execute<null>(settingsAuthHTTP)
    HttpResponseActivityReportValidator.validate(success, status)
    return data
  }
}
