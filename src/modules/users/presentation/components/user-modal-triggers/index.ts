import { BindUserPermissionProfilesModalTriggerComponent } from './bind-user-permission-profiles-modal-trigger.component'
import { PatchUserModalTriggerComponent } from './patch-user-modal-trigger.component'
import { PatchUserStatusModalTriggerComponent } from './patch-user-status-modal-trigger.component'
import { PostUserFilesModalTriggerComponent } from './post-user-files-modal-trigger.component'
import { PostUserModalTriggerComponent } from './post-user-modal-trigger.component'
import { PutUserPasswordResetModalTriggerComponent } from './put-user-password-reset-modal-trigger.component'
import { ViewMoreUserModalTriggerComponent } from './view-more-user-modal-trigger.component'

export const UserModalTriggers = {
  Post: PostUserModalTriggerComponent,
  Patch: PatchUserModalTriggerComponent,
  PostFiles: PostUserFilesModalTriggerComponent,
  BindPermissionProfiles: BindUserPermissionProfilesModalTriggerComponent,
  PutPasswordReset: PutUserPasswordResetModalTriggerComponent,
  PatchStatus: PatchUserStatusModalTriggerComponent,
  ViewMore: ViewMoreUserModalTriggerComponent
}
