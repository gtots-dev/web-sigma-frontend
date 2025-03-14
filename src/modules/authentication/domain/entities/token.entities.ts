import type { OAuthResponseInterface } from "../interfaces/o-auth-response.interface";

export class TokenEntities implements OAuthResponseInterface {
  constructor(public access_token: string, public token_type: string) {}
}
