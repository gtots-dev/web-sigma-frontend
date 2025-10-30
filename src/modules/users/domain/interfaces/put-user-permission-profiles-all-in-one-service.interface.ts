import type { UserPermissionProfileWithFeaturesAndContractsInterface } from './user-permission-profile-with-features-and-contracts.interface'

export interface PutUserPermissionProfileAllInOneServiceInterface {
  execute(
    profiles: UserPermissionProfileWithFeaturesAndContractsInterface
  ): Promise<void>
}
