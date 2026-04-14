import { AuthTokenFactory } from "@/modules/api/infrastructure/factories/auth-token.factory"
import type { PostTwoFactorGateway } from "../../domain/gateways/post-two-factor.gateway"
import { PostTwoFactorService } from "../services/post-two-factor.service"
import { ExecuteRequestFactory } from "@/modules/shared/infrastructure/factories/request.factory"
import { HttpClientFactory } from "@/modules/shared/infrastructure/factories/http-client.factory"

export class PostTwoFactorFactory {
  static create(): PostTwoFactorGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const authToken = AuthTokenFactory.create()
    return new PostTwoFactorService(executeRequest, authToken)
  }
}
