import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { PostActivityReportGateway } from '../../domain/gateways/post-activity-report.gateway'
import type { ActivityReportFiltersInterface } from '../../domain/interfaces/activity-report-filters.interface'
import type { PaginationInterface } from '@/modules/shared/domain/interfaces/pagination.interfaces'
import type { ActivityReportInterface } from '../../domain/interfaces/activity-report.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { AuthTokenProvider } from '@/modules/api/infrastructure/providers/token.provider'
export class PostActivityReportService implements PostActivityReportGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly auth: AuthTokenProvider
  ) {}

  getHttpRequestConfig(
    filters: {
      filters: ActivityReportFiltersInterface
      pagination: PaginationInterface
    },
    token: TokenEntities
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

  async execute(filters: {
    filters: ActivityReportFiltersInterface
    pagination: PaginationInterface
  }): Promise<HttpResponseInterface<ActivityReportInterface>> {
    const token = await this.auth.getToken()
    const settingsAuthHTTP = this.getHttpRequestConfig(filters, token)
    return await this.executeRequest.execute(settingsAuthHTTP)
  }
}
