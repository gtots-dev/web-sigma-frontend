import { type NextRequest, NextResponse } from 'next/server'
import { SelectOperationFactory } from '@/modules/api/infrastructure/factories/select-operation.factory'
import { OperationFactory } from '@/modules/operations/infrastructure/factories/operation.factory'
import type { OperationInterface } from '@/modules/operations/domain/interfaces/operation.interface'
import { GetOperationsFactory } from '@/modules/operations/infrastructure/factories/get-operations.factory'
import { auth } from '@/auth'
import { handleRedirectToOperationsUtil } from '@/modules/shared/presentation/utils/handle-redirect-to-operations.util'
import { JwtTokenDecodeFactory } from '../../factories/jwt-decode.factory'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import { PATHNAMES } from '../../configs/pathnames.config'
import type { JwtDecodeDataInterface } from '@/modules/shared/domain/interfaces/jwt-decode-data.interface'
import type { OperationEntities } from '@/modules/operations/domain/entities/operation.entity'

export async function RedirectToOperationsMiddleware(
  req: NextRequest
): Promise<NextResponse> {
  const { pathname, origin } = req.nextUrl
  const { SYSTEM, OPERATION_OPTIONS, OPERATIONS } = PATHNAMES

  const response = NextResponse.next()

  const redirectUrl = await handleRedirectToOperationsUtil(pathname, SYSTEM, {
    async getAuthToken(): Promise<TokenEntities | null> {
      const result = await auth()
      return result?.token || null
    },
    decodeToken(token: TokenEntities): JwtDecodeDataInterface {
      const jwtDecoder = JwtTokenDecodeFactory.create()
      return jwtDecoder.decode(token.access_token)
    },
    async getOperations(
      token: TokenEntities,
      ids: number[]
    ): Promise<OperationInterface[]> {
      const getOperations = GetOperationsFactory.create()
      return await getOperations.execute(token, ids)
    },
    createOperation(data): OperationEntities {
      return OperationFactory.create(data)
    },
    saveOperationToCookies(operation): void {
      const repo = SelectOperationFactory.create(req, response)
      repo.saveToCookies(operation)
    },
    getRedirectUrl(single: boolean): string {
      const path = single ? OPERATION_OPTIONS : OPERATIONS
      return new URL(path, origin).toString()
    }
  })

  return redirectUrl ? NextResponse.redirect(redirectUrl) : response
}
