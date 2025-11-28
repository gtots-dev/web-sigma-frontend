import type { LaneWithPointAndGroupInterface } from '../interfaces/lane-with-point-and-group.interface'

export interface GetContractLanesGateway {
  execute(): Promise<LaneWithPointAndGroupInterface[]>
}
