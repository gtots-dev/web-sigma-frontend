export interface PatchUserServiceInterface {
  execute(user: FormData): Promise<void>
}
