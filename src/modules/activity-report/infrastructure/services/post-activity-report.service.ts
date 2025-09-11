import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import { HttpResponseActivityReportValidator } from '../../domain/validators/http-response-activity-report.validator'
import type { PostActivityReportServiceInterface } from '../../domain/interfaces/post-activity-report-service.interface'
import type { ActivityReportFiltersInterface } from '../../domain/interfaces/activity-report-filters.interface'
import type { PaginationInterface } from '@/modules/shared/domain/interfaces/pagination.interfaces'

export class PostActivityReportService
  implements PostActivityReportServiceInterface
{
  constructor(private readonly executeRequest: ExecuteRequest) {}

  getHttpRequestConfig(
    token: TokenEntities,
    filters: {
      filters: ActivityReportFiltersInterface
      pagination: PaginationInterface
    }
  ): HttpRequestConfig {
    return {
      method: 'POST',
      url: `/logs/search`,
      data: filters,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(
    token: TokenEntities,
    filters: {
      filters: ActivityReportFiltersInterface
      pagination: PaginationInterface
    }
  ): Promise<any> {
    const settingsAuthHTTP = this.getHttpRequestConfig(token, filters)
    const { success, status, data }: HttpResponse<any> =
      await this.executeRequest.execute(settingsAuthHTTP)
    HttpResponseActivityReportValidator.validate(success, status)
    return data
  }
}
