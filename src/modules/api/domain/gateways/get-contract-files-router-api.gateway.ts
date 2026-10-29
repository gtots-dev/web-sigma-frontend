import type { ContractFileInterface } from '@/modules/contracts/domain/interfaces/contract-file.interface'

export interface GetContractFilesRouterApiGateway {
  execute(): Promise<ContractFileInterface[]>
}
