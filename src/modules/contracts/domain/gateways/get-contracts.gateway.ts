import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { ContractEntity } from '../entities/contract.entity'

export interface GetContractsGateway {
  execute(): Promise<HttpResponseInterface<ContractEntity[]>>
}
