import type { OperationInterface } from '../interfaces/operation.interface'

export class OperationEntities implements OperationInterface {
  constructor(
    public id: string,
    public name: string
  ) {}
}
