import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { LaneEntity } from '@/modules/lanes/domain/entities/lane.entity'
import type { PostLaneRouterApiServiceInterface } from '../../domain/interfaces/post-lane-router-api-service.interface'
import { HttpResponseLaneValidator } from '@/modules/lanes/domain/validators/http-response-lane.validator'

export class PostLaneRouterApiService
  implements PostLaneRouterApiServiceInterface
{
  constructor(private readonly executeRequest: ExecuteRequest) {}

  getHttpRequestConfig(lane: LaneEntity): HttpRequestConfig<LaneEntity> {
    return {
      method: 'POST',
      data: lane,
      url: 'api/lane'
    }
  }

  async execute(lane: LaneEntity): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(lane)
    const { success, status } =
      await this.executeRequest.execute<null>(settingsAuthHTTP)
    HttpResponseLaneValidator.validate(success, status)
  }
}
