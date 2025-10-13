import type { ContractInterface } from '../interfaces/contract.interface'

export class ContractEntity implements ContractInterface {
  constructor(
    public name: string,
    public alias: string,
    public cfg: string,
    public operation_id: number,
    public id?: number,
    public enabled?: boolean
  ) {}
}
