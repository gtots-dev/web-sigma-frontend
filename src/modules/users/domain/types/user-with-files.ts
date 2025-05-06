import type { UserEntity } from '../entities/user.entity'

export type UserWithFiles = Partial<UserEntity> & { files: Blob[] }
