import { PatchPermissionProfileModal } from './patch-permission-profile-modal.component'
import { PatchPermissionProfileStatusModal } from './patch-permission-profile-status-modal.component'
import { PostPermissionProfileModal } from './post-permission-profile-modal.component'

export const PermissionProfileModal = {
  Post: PostPermissionProfileModal,
  Patch: PatchPermissionProfileModal,
  PatchStatus: PatchPermissionProfileStatusModal
}
