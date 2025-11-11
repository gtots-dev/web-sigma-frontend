import type { OperationEntity } from "@/modules/operations/domain/entities/operation.entity";

export interface GetOperationsRouterApiGateway {
  execute(): Promise<OperationEntity[]>
}
