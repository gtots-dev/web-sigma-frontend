export interface PostUserServiceInterface {
  execute(user: FormData): Promise<void>
}
