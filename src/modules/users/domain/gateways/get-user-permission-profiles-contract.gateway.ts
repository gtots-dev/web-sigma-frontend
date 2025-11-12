import type { UserPermissionProfileContractInterface } from '@/modules/users/domain/interfaces/user-permission-profile-contract.interface'

export interface GetUserPermissionProfileContractGateway {
  execute(): Promise<UserPermissionProfileContractInterface[]>
}
