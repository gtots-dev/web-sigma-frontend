import { BindUserPermissionProfilesModal } from './bind-user-permission-profiles-modal.component'
import { PatchUserModal } from './patch-user-modal.component'
import { PatchUserStatusModal } from './patch-user-status-modal.component'
import { PostUserFilesModal } from './post-user-files-modal.component'
import { PostUserModal } from './post-user-modal.component'
import { PutUserPasswordResetModal } from './put-user-password-reset-modal.component'
import { ViewMoreUserModal } from './view-more-user-modal.component'

export const UserModals = {
  Post: PostUserModal,
  Patch: PatchUserModal,
  PostFiles: PostUserFilesModal,
  BindPermissionProfiles: BindUserPermissionProfilesModal,
  PutPasswordReset: PutUserPasswordResetModal,
  PatchStatus: PatchUserStatusModal,
  ViewMore: ViewMoreUserModal
}
