import type { ContractInterface } from '@/modules/contracts/domain/interfaces/contract.interface'
import type { UserInterface } from '@/modules/users/domain/interfaces/user.interface'

export interface ActivityReportFiltersInterface {
  operation_ids?: number[]
  user_ids?: UserInterface['id'][]
  contract_ids?: ContractInterface['id'][]
  actions?: string[]
  date_range?: {
    start?: string
    end?: string
  }
}
