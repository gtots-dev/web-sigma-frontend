import type { LaneEntity } from '@/modules/lanes/domain/entities/lane.entity'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'

export interface GetLanesRouterApiGateway {
  execute(): Promise<HttpResponseInterface<LaneEntity[]>>
}
