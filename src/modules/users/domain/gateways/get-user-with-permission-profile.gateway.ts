import type { PermissionProfileWithUserInterface } from '@/modules/permissions/domain/interfaces/permission-profile-with-user.interface'

export interface GetUserWithPermissionProfileGateway {
  execute(): Promise<PermissionProfileWithUserInterface[]>
}
