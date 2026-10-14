import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { LaneStatusInterface } from '../interfaces/lane-status.interface'

export interface GetLanesStatusListGateway {
  execute(): Promise<HttpResponseInterface<LaneStatusInterface[]>>
}
