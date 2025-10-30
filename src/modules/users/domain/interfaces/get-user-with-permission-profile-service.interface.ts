import type { PermissionProfileWithUserInterface } from '@/modules/permissions/domain/interfaces/permission-profile-with-user.interface'

export interface GetUserWithPermissionProfileServiceInterface {
  execute(): Promise<PermissionProfileWithUserInterface[]>
}
