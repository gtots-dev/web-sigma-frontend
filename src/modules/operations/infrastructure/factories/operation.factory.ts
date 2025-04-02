import { OperationEntities } from '@/modules/operations/domain/entities/operation.entities'
import type { OperationInterface } from '@/modules/operations/domain/interfaces/operation.interface'
export class OperationFactory {
  static create({ id, name }: OperationInterface): OperationEntities {
    return new OperationEntities(id, name)
  }
}
