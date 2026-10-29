import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { ContractEntity } from '../entities/contract.entity'

export interface PatchContractGateway {
  execute(
    contract: Partial<ContractEntity>
  ): Promise<HttpResponseInterface<ContractEntity>>
}
