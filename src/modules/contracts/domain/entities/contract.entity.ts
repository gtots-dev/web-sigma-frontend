import type { ContractInterface } from "../interfaces/contract.interface";

export class ContractEntity implements ContractInterface {
  constructor(
    public name: string,
    public alias: string,
    public operation_id: number,
    public cfg: string,
    public id?: number,
    public enabled?: boolean,
  ) {}
}
