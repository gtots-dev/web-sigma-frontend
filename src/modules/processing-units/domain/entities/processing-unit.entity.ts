import type { ProcessingUnitInterface } from '../interfaces/processing-unit.interface'

export class ProcessingUnitEntity implements ProcessingUnitInterface {
  constructor(
    public name: string,
    public enabled?: boolean,
    public cfg?: string,
    public id?: number
  ) {}
}
