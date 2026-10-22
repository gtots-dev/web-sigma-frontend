import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { StatusLaneIgnoreInterface } from '@/modules/status-lanes/domain/interfaces/status-lane-ignore.interface'

export interface GetStatusLaneIgnoreRouterApiGateway {
  execute(): Promise<HttpResponseInterface<StatusLaneIgnoreInterface[]>>
}
