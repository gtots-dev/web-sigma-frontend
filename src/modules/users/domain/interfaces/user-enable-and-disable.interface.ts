import type { UserEntity } from '../entities/user.entity'

export interface UserEnableAndDisableInterface {
  id?: UserEntity['id']
  enabled: boolean
}
