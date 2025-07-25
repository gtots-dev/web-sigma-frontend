import { OperationEntity } from '@/modules/operations/domain/entities/operation.entity'
import type { OperationInterface } from '@/modules/operations/domain/interfaces/operation.interface'
export class OperationFactory {
  static create({ id, name }: OperationInterface): OperationEntity {
    return new OperationEntity(id, name)
  }
}
