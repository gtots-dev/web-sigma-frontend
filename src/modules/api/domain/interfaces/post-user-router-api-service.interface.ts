import type { OperationEntity } from '@/modules/operations/domain/entities/operation.entity'
import type { UserWithFiles } from '@/modules/users/domain/types/user-with-files'

export interface PostUserRouterApiServiceInterface {
  execute(
    user: UserWithFiles,
    operationId: OperationEntity['id']
  ): Promise<void>
}
