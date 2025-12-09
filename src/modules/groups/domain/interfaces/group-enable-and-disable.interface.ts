import type { GroupEntity } from '../entities/group.entity'

export interface GroupEnableAndDisableInterface {
  id?: GroupEntity['id']
  enabled: boolean
}
