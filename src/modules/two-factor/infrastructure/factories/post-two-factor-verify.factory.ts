import { AuthTokenFactory } from "@/modules/api/infrastructure/factories/auth-token.factory"
import { ExecuteRequestFactory } from "@/modules/shared/infrastructure/factories/request.factory"
import { HttpClientFactory } from "@/modules/shared/infrastructure/factories/http-client.factory"
import { PostTwoFactorVerifyService } from "../services/post-two-factor-verify.service"
import type { PostTwoFactorVerifyGateway } from "../../domain/gateways/post-two-factor-verify.gateway"

export class PostTwoFactorVerifyFactory {
  static create(): PostTwoFactorVerifyGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const authToken = AuthTokenFactory.create()
    return new PostTwoFactorVerifyService(executeRequest, authToken)
  }
}
