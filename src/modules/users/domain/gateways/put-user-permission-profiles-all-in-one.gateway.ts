import type { UserPermissionProfileWithFeaturesAndContractsInterface } from '../interfaces/user-permission-profile-with-features-and-contracts.interface'

export interface PutUserPermissionProfileAllInOneGateway {
  execute(
    profiles: UserPermissionProfileWithFeaturesAndContractsInterface
  ): Promise<void>
}
