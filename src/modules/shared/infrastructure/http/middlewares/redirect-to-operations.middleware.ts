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
  const { SYSTEM, OPERATIONS } = PATHNAMES

  try {
    const response = NextResponse.next()

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
        const writer = CookiesFactory.createWriter(req, response, 'operation')
        writer.saveToCookies(operation)
      },
      getRedirectUrl(isSingle, id) {
        const pathname =
          isSingle && id != null
            ? `${OPERATIONS}/${id}/operation-options`
            : `${OPERATIONS}`
        return new URL(pathname, origin).toString()
      }
    })

    if (redirectTo) {
      const redirectResponse = NextResponse.redirect(redirectTo)
      response.cookies.getAll().forEach((cookie) => {
        redirectResponse.cookies.set(cookie.name, cookie.value, cookie)
      })
      return redirectResponse
    }

    return response
  } catch (error) {
    if (
      error instanceof HttpResponseError &&
      error.message === HttpStatusCodeEnum.UNAUTHORIZED
    ) {
      const redirectUrl = new URL(PATHNAMES.AUTHENTICATION, req.nextUrl.origin)
      const response = NextResponse.redirect(redirectUrl)
      req.cookies.getAll().forEach((cookie) => {
        response.cookies.set(cookie.name, '', {
          expires: new Date(0),
          path: '/'
        })
      })
      return response
    }

    throw error
  }
}
