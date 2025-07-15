import type { PermissionProfileInterface } from '../interfaces/permission-profiles.interface'

export class PermissionProfileEntity implements PermissionProfileInterface {
  constructor(
    public name: string,
    public description: string,
    public operation_id?: number,
    public id?: number
  ) {}
}
