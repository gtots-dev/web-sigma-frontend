import { PatchPointModal } from './patch-point-modal.component'
import { PatchPointStatusModal } from './patch-point-status-modal.component'
import { PostPointLaneModal } from './post-point-lane-modal.component'
import { PostPointModal } from './post-point-modal.component'
import { ViewMorePointModal } from './view-more-point-modal.component'

export const PointModal = {
  Post: PostPointModal,
  Patch: PatchPointModal,
  PatchStatus: PatchPointStatusModal,
  PostLane: PostPointLaneModal,
  ViewMore: ViewMorePointModal
}
