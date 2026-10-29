import { PostContractModal as PostComponent } from './post-contract-modal.component'
import { PatchContractModal as PatchComponent } from './patch-contract-modal.component'
import { PutContractStatusModal as PutStatusComponent } from './put-contract-status-modal.component'
import { PostContractFilesModal as PostFilesComponent } from './post-contract-files-modal.component'

export const ContractModal = {
  Post: PostComponent,
  Patch: PatchComponent,
  PutStatus: PutStatusComponent,
  Files: PostFilesComponent
}
