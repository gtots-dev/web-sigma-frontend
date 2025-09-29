import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { PostActivityReportRouterApiServiceInterface } from '../../domain/interfaces/post-activity-report-router-api-service.interface'
import { PostActivityReportRouterApiService } from '../services/post-activity-report-router-api.service'

export class PostActivityReportRouterApiFactory {
  static create(): PostActivityReportRouterApiServiceInterface {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostActivityReportRouterApiService(executeRequest)
  }
}
