import { PatchPointModalTriggerComponent } from './patch-point-modal-trigger.component'
import { PatchPointStatusModalTriggerComponent } from './patch-point-status-modal-trigger.component'
import { PostPointLaneModalTriggerComponent } from './post-point-lane-modal-trigger.component'
import { PostPointModalTriggerComponent } from './post-point-modal-trigger.component'
import { ViewMorePointModalTriggerComponent } from './view-more-point-modal-trigger.component'

export const PointModalTrigger = {
  Post: PostPointModalTriggerComponent,
  Patch: PatchPointModalTriggerComponent,
  PatchStatus: PatchPointStatusModalTriggerComponent,
  PostLane: PostPointLaneModalTriggerComponent,
  ViewMore: ViewMorePointModalTriggerComponent
}
