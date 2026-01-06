import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { PostActivityReportGateway } from '../../domain/gateways/post-activity-report.gateway'
import type { ActivityReportFiltersInterface } from '../../domain/interfaces/activity-report-filters.interface'
import type { PaginationInterface } from '@/modules/shared/domain/interfaces/pagination.interfaces'
import type { ActivityReportInterface } from '../../domain/interfaces/activity-report.interface'

export class PostActivityReportService implements PostActivityReportGateway {
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
  ): Promise<ActivityReportInterface> {
    const settingsAuthHTTP = this.getHttpRequestConfig(token, filters)
    const { data }: HttpResponseInterface<ActivityReportInterface> =
      await this.executeRequest.execute(settingsAuthHTTP)
    return data
  }
}
