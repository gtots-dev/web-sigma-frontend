import type { TokenEntities } from "@/modules/authentication/domain/entities/token.entity";

export interface TokenProviderInterface {
  getToken(): Promise<TokenEntities>
}
