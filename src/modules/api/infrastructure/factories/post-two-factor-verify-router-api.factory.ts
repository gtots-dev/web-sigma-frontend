import { HttpClientFactory } from "@/modules/shared/infrastructure/factories/http-client.factory"
import { ExecuteRequestFactory } from "@/modules/shared/infrastructure/factories/request.factory"
import type { PostTwoFactorVerifyRouterApiGateway } from "../../domain/gateways/post-two-factor-verify-router-api.gateway"
import { PostTwoFactorVerifyRouterApiService } from "../services/post-two-factor-verify-router-api.service"

export class PostTwoFactorVerifyRouterApiFactory {
  static create(): PostTwoFactorVerifyRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostTwoFactorVerifyRouterApiService(executeRequest)
  }
}
