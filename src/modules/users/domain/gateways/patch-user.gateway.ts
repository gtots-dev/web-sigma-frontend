export interface PatchUserGateway {
  execute(user: FormData): Promise<void>
}
