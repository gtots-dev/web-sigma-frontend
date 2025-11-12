import type { PermissionProfileWithUserInterface } from '@/modules/permissions/domain/interfaces/permission-profile-with-user.interface'

export interface GetUserWithPermissionProfileRouterApiGateway {
  execute(): Promise<PermissionProfileWithUserInterface[]>
}
