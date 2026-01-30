import type { LaneWithPointAndGroupInterface } from '@/modules/lanes/domain/interfaces/lane-with-point-and-group.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'

export interface GetContractLanesRouterApiGateway {
  execute(): Promise<HttpResponseInterface<LaneWithPointAndGroupInterface[]>>
}
