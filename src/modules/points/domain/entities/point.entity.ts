import type { PointInterface } from '../interfaces/point.interface'

export class PointEntity implements PointInterface {
  constructor(
    public name: string,
    public description?: string | null,
    public cfg?: string,
    public id?: number,
    public enabled?: boolean
  ) {}
}
