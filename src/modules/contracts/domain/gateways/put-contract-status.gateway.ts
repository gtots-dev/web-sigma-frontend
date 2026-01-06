import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { ContractEntity } from '../entities/contract.entity'
import type { HttpResponseErrorInterface } from '@/modules/shared/domain/interfaces/http-response-error.interface'

export interface PutContractStatusGateway {
  execute(
    contract: ContractEntity
  ): Promise<HttpResponseInterface<void> | HttpResponseErrorInterface>
}
