import { JwtTokenDecodeFactory } from '@/modules/shared/infrastructure/factories/jwt-decode.factory';
import { auth } from '@/auth';
import type { JwtDecodeDataInterface } from '@/modules/shared/domain/interfaces/jwt-decode-data.interface';

export async function useJwtInfo(): Promise<JwtDecodeDataInterface> {
  const { accessToken } = await auth();
  const JwtDecode = JwtTokenDecodeFactory.create();
  return JwtDecode.decode(accessToken) as JwtDecodeDataInterface;
}
