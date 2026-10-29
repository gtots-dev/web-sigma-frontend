import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { ContractFilesInterface } from '@/modules/contracts/domain/interfaces/contract-files.interface'

export interface PostContractFilesRouterApiGateway {
  execute(files: ContractFilesInterface): Promise<HttpResponseInterface<void>>
}
