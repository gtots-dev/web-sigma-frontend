import type { ProcessingUnitInterface } from '../interfaces/processing-unit.interface'

export class ProcessingUnitEntity implements ProcessingUnitInterface {
  constructor(
    public name: string,
    public contract_id: number,
    public operation_id: number,
    public enabled?: boolean,
    public cfg?: string,
    public id?: number
  ) {}
}
