import { HttpClientFactory } from "@/modules/shared/infrastructure/factories/http-client.factory"
import type { PostTwoFactorRouterApiGateway } from "../../domain/gateways/post-two-factor-router-api.gateway"
import { ExecuteRequestFactory } from "@/modules/shared/infrastructure/factories/request.factory"
import { PostTwoFactorRouterApiService } from "../services/post-two-factor-router-api.service"

export class PostTwoFactorRouterApiFactory {
  static create(): PostTwoFactorRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostTwoFactorRouterApiService(executeRequest)
  }
}
