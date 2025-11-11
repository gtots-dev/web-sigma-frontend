import type { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'
import type { LaneEntity } from '@/modules/lanes/domain/entities/lane.entity'
import type { OperationEntity } from '@/modules/operations/domain/entities/operation.entity'
import type { PermissionProfileEntity } from '@/modules/permissions/domain/entities/permission-profile.entity'
import type { FeaturesInterface } from '@/modules/permissions/domain/interfaces/features.interface'
import type { ProcessingUnitEntity } from '@/modules/processing-units/domain/entities/processing-unit.entity'
import type { UserEntity } from '@/modules/users/domain/entities/user.entity'
import type { UserFileInterface } from '@/modules/users/domain/interfaces/user-file.interface'

export interface UrlParams {
  operationId?: OperationEntity['id']
  contractId?: ContractEntity['id']
  processingUnitId?: ProcessingUnitEntity['id']
  laneId?: LaneEntity['id']
  userId?: UserEntity['id']
  fileId?: UserFileInterface['id']
  permissionProfileId?: PermissionProfileEntity['id']
  featureId?: FeaturesInterface['id']
}
