import { PatchGroupModal } from './patch-group-modal.component'
import { PatchGroupStatusModal } from './patch-group-status-modal.component'
import { PostGroupLaneModal } from './post-group-lane-modal.component'
import { PostGroupModal } from './post-group-modal.component'
import { PostGroupPointModal } from './post-group-point-modal.component'
import { PostGroupSubgroupModal } from './post-group-subgroup-modal.component'
import { ViewMoreGroupModal } from './view-more-group-modal.component'

export const GroupModal = {
  Post: PostGroupModal,
  Patch: PatchGroupModal,
  PatchStatus: PatchGroupStatusModal,
  PostLane: PostGroupLaneModal,
  PostPoint: PostGroupPointModal,
  PostSubgroup: PostGroupSubgroupModal,
  ViewMore: ViewMoreGroupModal
}
