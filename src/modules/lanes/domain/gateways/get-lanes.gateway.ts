import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { LaneEntity } from '../entities/lane.entity'

export interface GetLanesGateway {
  execute(): Promise<HttpResponseInterface<LaneEntity[]>>
}
