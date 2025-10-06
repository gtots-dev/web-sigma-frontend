import type { OperationEntity } from "@/modules/operations/domain/entities/operation.entity";

export interface GetOperationsRouterApiServiceInterface {
  execute(): Promise<OperationEntity[]>
}
