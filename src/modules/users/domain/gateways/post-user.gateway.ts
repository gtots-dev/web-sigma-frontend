export interface PostUserGateway {
  execute(user: FormData): Promise<void>
}
