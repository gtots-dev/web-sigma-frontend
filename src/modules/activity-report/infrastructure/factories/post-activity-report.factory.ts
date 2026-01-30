import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { PostActivityReportService } from '../services/post-activity-report.service'
import type { PostActivityReportGateway } from '../../domain/gateways/post-activity-report.gateway'
import { AuthTokenFactory } from '@/modules/api/infrastructure/factories/auth-token.factory'
export class PostActivityReportFactory {
  static create(): PostActivityReportGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const authToken = AuthTokenFactory.create()
    return new PostActivityReportService(executeRequest, authToken)
  }
}
