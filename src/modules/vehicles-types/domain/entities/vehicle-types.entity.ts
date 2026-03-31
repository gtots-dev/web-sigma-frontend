import type { VehiclesTypesInterface } from '../interfaces/vehicle-type.interface'

export class VehicleTypeEntity implements VehiclesTypesInterface {
  constructor(
    public name: string,
    public color: string,
    public code?: number,
    public id?: number
  ) {}
}
