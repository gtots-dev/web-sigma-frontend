import type { OperationInterface } from '../interfaces/operation.interface'

export class OperationEntity implements OperationInterface {
  constructor(
    public id: string,
    public name: string
  ) {}
}
