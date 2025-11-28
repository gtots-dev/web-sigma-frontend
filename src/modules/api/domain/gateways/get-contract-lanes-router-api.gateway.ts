import type { LaneWithPointAndGroupInterface } from '@/modules/lanes/domain/interfaces/lane-with-point-and-group.interface'

export interface GetContractLanesRouterApiGateway {
  execute(): Promise<LaneWithPointAndGroupInterface[]>
}
