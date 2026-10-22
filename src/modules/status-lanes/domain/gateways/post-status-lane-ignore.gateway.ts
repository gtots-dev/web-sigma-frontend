import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type {
  PostStatusLaneIgnoreInterface,
  StatusLaneIgnoreInterface
} from '../interfaces/status-lane-ignore.interface'

export interface PostStatusLaneIgnoreGateway {
  execute(
    data: PostStatusLaneIgnoreInterface
  ): Promise<HttpResponseInterface<StatusLaneIgnoreInterface>>
}
