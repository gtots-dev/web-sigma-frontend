import { UserEntity } from '@/modules/users/domain/entities/user.entity'
import type { UserInterface } from '@/modules/users/domain/interfaces/user.interface'

export class UserFactory {
  static create(user: UserInterface): UserEntity {
    const { id, login_name, name, email, company, position, enabled } = user
    return new UserEntity(
      id,
      login_name,
      name,
      email,
      company,
      position,
      enabled
    )
  }
}
