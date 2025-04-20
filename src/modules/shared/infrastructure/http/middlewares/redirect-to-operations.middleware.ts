import { NextResponse, type NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

import { SelectOperationFactory } from '@/modules/api/infrastructure/factories/select-operation.factory'
import { OperationFactory } from '@/modules/operations/infrastructure/factories/operation.factory'
import { handleRedirectToOperationsUtil } from '@/modules/shared/presentation/utils/handle-redirect-to-operations.util'

export async function RedirectToOperationsMiddleware(
  req: NextRequest
): Promise<NextResponse> {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET })
  const result = handleRedirectToOperationsUtil({
    pathname: req.nextUrl.pathname,
    accessToken: token?.accessToken,
    baseUrl: req.url
  })

  if (!result.shouldRedirect) return NextResponse.next()

  const response = NextResponse.redirect(result.redirectUrl!)

  if (result.selectedOperationId) {
    const repository = SelectOperationFactory.create(req, response)
    const operation = OperationFactory.create({
      id: result.selectedOperationId,
      name: 'operation-automatic'
    })
    repository.saveToCookies(operation)
  }

  return response
}
