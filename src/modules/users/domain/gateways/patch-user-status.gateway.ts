export interface PatchUserStatusGateway {
  execute(userEnableAndDisable: FormData): Promise<void>
}
