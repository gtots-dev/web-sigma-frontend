import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { StatusLaneIgnoreInterface } from '../interfaces/status-lane-ignore.interface'

export interface GetStatusLaneIgnoreGateway {
  execute(): Promise<HttpResponseInterface<StatusLaneIgnoreInterface[]>>
}
