import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { LaneEntity } from '../../domain/entities/lane.entity'
import type { PostLaneServiceInterface } from '../../domain/interfaces/post-lane.service'
import { HttpResponseLaneValidator } from '../../domain/validators/http-response-lane.validator'
import type { ConvertJsonToFormData } from '@/modules/shared/infrastructure/services/convert-json-to-form-data.service'

export class PostLaneService
  implements PostLaneServiceInterface
{
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly convertFormData: ConvertJsonToFormData
  ) {}

  getHttpRequestConfig(
    token: TokenEntities,
    lane: LaneEntity
  ): HttpRequestConfig<FormData> {
    return {
      method: 'POST',
      url: `/equipments/lanes`,
      data: this.convertFormData.execute({ ...lane }),
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(
    token: TokenEntities,
    lane: LaneEntity
  ): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(token, lane)
    const { success, status }: HttpResponse<null> =
      await this.executeRequest.execute(settingsAuthHTTP)
    HttpResponseLaneValidator.validate(success, status)
  }
}
