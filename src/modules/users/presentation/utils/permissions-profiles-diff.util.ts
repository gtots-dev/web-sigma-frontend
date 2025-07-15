import type { PermissionProfileWithUserInterface } from '@/modules/permissions/domain/interfaces/permission-profile-with-user.interface'

export function getProfilesToDeleteUtil(
  currentBindings: PermissionProfileWithUserInterface[],
  selectedProfileIds: PermissionProfileWithUserInterface['perm_profile_id'][]
): PermissionProfileWithUserInterface['id'][] {
  return currentBindings
    .filter((binding) => !selectedProfileIds.includes(binding.perm_profile_id))
    .map((binding) => binding.id)
}

export function getProfilesToAddUtil(
  currentBindings: PermissionProfileWithUserInterface[],
  selectedProfileIds: PermissionProfileWithUserInterface['perm_profile_id'][]
): PermissionProfileWithUserInterface['perm_profile_id'][] {
  const currentProfileIds = currentBindings.map((b) => b.perm_profile_id)
  return selectedProfileIds.filter((id) => !currentProfileIds.includes(id))
}
