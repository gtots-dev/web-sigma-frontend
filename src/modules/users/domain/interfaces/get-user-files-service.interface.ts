import type { UserFileInterface } from './user-file.interface'

export interface GetUserFilesServiceInterface {
  execute(): Promise<UserFileInterface[]>
}
