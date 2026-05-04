import { type NextRequest, NextResponse } from 'next/server'
import { OperationFactory } from '@/modules/operations/infrastructure/factories/operation.factory'
import { GetOperationsFactory } from '@/modules/operations/infrastructure/factories/get-operations.factory'
import { auth } from '@/auth'
import { handleRedirectToOperationsUtil } from '@/modules/shared/presentation/utils/handle-redirect-to-operations.util'
import { JwtTokenDecodeFactory } from '../../factories/jwt-decode.factory'
import { PATHNAMES } from '../../configs/pathnames.config'
import { HttpResponseError } from '../../errors/http-response.error'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import { CookiesFactory } from '@/modules/api/infrastructure/factories/cookies.factory'

export async function RedirectToOperationsMiddleware(
  req: NextRequest
): Promise<NextResponse> {
  const { pathname, origin } = req.nextUrl
  const { SYSTEM, OPERATIONS, OPERATION_OPTIONS, TWO_FACTOR } = PATHNAMES

  if (!pathname.startsWith(SYSTEM)) return NextResponse.next()
  if (pathname.startsWith(TWO_FACTOR)) return NextResponse.next()

  try {
    const redirectTo = await handleRedirectToOperationsUtil(pathname, SYSTEM, {
      async getAuthToken() {
        const session = await auth()
        return session?.token ?? null
      },
      decodeToken(token) {
        return JwtTokenDecodeFactory.create().decode(token.access_token)
      },
      async getOperations() {
        return await GetOperationsFactory.create().execute()
      },
      createOperation(data) {
        return OperationFactory.create(data)
      },
      saveOperationToCookies(operation) {
        const response = NextResponse.next()
        const writer = CookiesFactory.createWriter(req, response, 'operation')
        writer.saveToCookies(operation)
      },
      getRedirectUrl(isSingle, id) {
        const path =
          isSingle && id != null ? OPERATION_OPTIONS(Number(id)) : OPERATIONS

        return new URL(path, origin).toString()
      }
    })

    if (redirectTo && redirectTo !== pathname)
      return NextResponse.redirect(new URL(redirectTo, origin))

    return NextResponse.next()
  } catch (error) {
    if (
      error instanceof HttpResponseError &&
      error.message.includes('Two-factor authentication')
    )
      return NextResponse.next()

    if (
      error instanceof HttpResponseError &&
      String(error.status) === HttpStatusCodeEnum.UNAUTHORIZED
    )
      return NextResponse.next()

    throw error
  }
}
