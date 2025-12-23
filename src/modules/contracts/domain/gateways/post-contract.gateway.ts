import type { ContractEntity } from '../entities/contract.entity'
import type { HttpContractError } from '../validators/http-response-contracts.validator'

export interface PostContractGateway {
  execute(contract: ContractEntity): Promise<HttpContractError>
}
