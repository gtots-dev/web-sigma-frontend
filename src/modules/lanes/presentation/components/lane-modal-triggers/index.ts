import { PatchLaneModalTrigger } from './patch-lane-modal-trigger.component'
import { PatchLaneStatusModalTrigger } from './patch-lane-status-modal-trigger.component'
import { PostLaneModalTrigger } from './post-lane-modal-trigger.component'

export const LaneModalTrigger = {
  Post: PostLaneModalTrigger,
  Patch: PatchLaneModalTrigger,
  PatchStatus: PatchLaneStatusModalTrigger
}
