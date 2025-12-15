import type { GroupInterface } from '../interfaces/group.interface'

export class GroupEntity implements GroupInterface {
  constructor(
    public name: string,
    public description?: string | null,
    public cfg?: string,
    public id?: number,
    public enabled?: boolean
  ) {}
}
