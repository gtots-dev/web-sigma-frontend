import type { UserPermissionProfileWithFeaturesAndContractsInterface } from '@/modules/users/domain/interfaces/user-permission-profile-with-features-and-contracts.interface'
export interface PutUserPermissionProfileAllInOneRouterApiServiceInterface {
  execute(
    profiles: UserPermissionProfileWithFeaturesAndContractsInterface
  ): Promise<void>
}
