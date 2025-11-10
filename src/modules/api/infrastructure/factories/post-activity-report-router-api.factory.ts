import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { PostActivityReportRouterApiGateway } from '../../domain/gateways/post-activity-report-router-api.gateway'
import { PostActivityReportRouterApiService } from '../services/post-activity-report-router-api.service'

export class PostActivityReportRouterApiFactory {
  static create(): PostActivityReportRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostActivityReportRouterApiService(executeRequest)
  }
}
