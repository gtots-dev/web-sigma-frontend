export interface PatchUserStatusServiceInterface {
  execute(userEnableAndDisable: FormData): Promise<void>
}
