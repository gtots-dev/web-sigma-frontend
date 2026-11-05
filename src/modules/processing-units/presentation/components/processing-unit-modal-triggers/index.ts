import { PatchProcessingUnitModalTrigger } from './patch-processing-unit-modal-trigger.component'
import { PatchProcessingUnitStatusModalTrigger } from './patch-processing-unit-status-modal-trigger.component'
import { PostProcessingUnitModalTrigger } from './post-processing-unit-modal-trigger.component'

export const ProcessingUnitModalTrigger = {
  Post: PostProcessingUnitModalTrigger,
  Patch: PatchProcessingUnitModalTrigger,
  PatchStatus: PatchProcessingUnitStatusModalTrigger
}
