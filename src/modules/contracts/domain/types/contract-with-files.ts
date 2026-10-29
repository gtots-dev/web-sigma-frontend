import type { ContractEntity } from '../entities/contract.entity'

export type ContractWithFiles = Partial<ContractEntity> & { files?: File[] }
