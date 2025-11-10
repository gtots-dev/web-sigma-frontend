import type { LaneInterface } from '../interfaces/lane.interface'

export class LaneEntity implements LaneInterface {
  constructor(
    public name: string,
    public cfg: string,
    public id?: number,
    public enabled?: boolean
  ) {}
}
