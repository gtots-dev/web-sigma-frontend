import { PatchPermissionProfileModalTrigger } from './patch-permission-profile-modal-trigger.component'
import { PatchPermissionProfileStatusModalTrigger } from './patch-permission-profile-status-modal-trigger.component'
import { PostPermissionProfileModalTrigger } from './post-permission-profile-modal-trigger.component'

export const PermissionProfileModalTrigger = {
  Post: PostPermissionProfileModalTrigger,
  Patch: PatchPermissionProfileModalTrigger,
  PatchStatus: PatchPermissionProfileStatusModalTrigger
}
