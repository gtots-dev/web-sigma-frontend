import type { JwtDecodeDataInterface } from "./jwt-decode-data.interface";

export interface JwtDecodeInterface {
  decode(token: string): JwtDecodeDataInterface
}
