import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type {
  PostStatusLaneIgnoreInterface,
  StatusLaneIgnoreInterface
} from '@/modules/status-lanes/domain/interfaces/status-lane-ignore.interface'

export interface PostStatusLaneIgnoreRouterApiGateway {
  execute(
    data: PostStatusLaneIgnoreInterface
  ): Promise<HttpResponseInterface<StatusLaneIgnoreInterface>>
}
