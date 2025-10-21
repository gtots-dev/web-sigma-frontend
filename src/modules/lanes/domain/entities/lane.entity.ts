import type { LaneInterface } from '../interfaces/lane.interface'

export class LaneEntity implements LaneInterface {
  constructor(
    public name: string,
    public cfg: string,
    public up_id: number,
    public operation_id: number,
    public contract_id: number,
    public id?: number,
    public enabled?: boolean
  ) {}
}
