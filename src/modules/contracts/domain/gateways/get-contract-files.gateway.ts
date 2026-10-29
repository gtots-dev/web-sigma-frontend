import type { ContractFileInterface } from '../interfaces/contract-file.interface'

export interface GetContractFilesGateway {
  execute(): Promise<ContractFileInterface[]>
}
