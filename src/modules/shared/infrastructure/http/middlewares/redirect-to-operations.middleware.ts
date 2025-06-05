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
import { HttpResponseError } from '../../errors/http-response.error'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'

export async function RedirectToOperationsMiddleware(
  req: NextRequest
): Promise<NextResponse> {
  const { pathname, origin } = req.nextUrl
  const { SYSTEM, OPERATION_OPTIONS, OPERATIONS } = PATHNAMES

  const response = NextResponse.next()

  try {
    const redirectTo = await handleRedirectToOperationsUtil(pathname, SYSTEM, {
      async getAuthToken(): Promise<TokenEntities | null> {
        const session = await auth()
        return session?.token ?? null
      },
      decodeToken(token: TokenEntities): JwtDecodeDataInterface {
        return JwtTokenDecodeFactory.create().decode(token.access_token)
      },
      async getOperations(
        token: TokenEntities,
        ids: number[]
      ): Promise<OperationInterface[]> {
        return await GetOperationsFactory.create().execute(token, ids)
      },
      createOperation(data): OperationEntities {
        return OperationFactory.create(data)
      },
      saveOperationToCookies(operation): void {
        const repo = SelectOperationFactory.create(req, response)
        repo.saveToCookies(operation)
      },
      getRedirectUrl(isSingle: boolean): string {
        const targetPath = isSingle ? OPERATION_OPTIONS : OPERATIONS
        return new URL(targetPath, origin).toString()
      }
    })

    if (redirectTo) {
      const redirectResponse = NextResponse.redirect(redirectTo)
      response.cookies
        .getAll()
        .forEach((cookie) =>
          redirectResponse.cookies.set(cookie.name, cookie.value, cookie)
        )
      return redirectResponse
    }
  } catch (error) {
    if (error instanceof HttpResponseError) {
      if (error.message === HttpStatusCodeEnum.UNAUTHORIZED) req.cookies.clear()
    }
  }
  return response
}
