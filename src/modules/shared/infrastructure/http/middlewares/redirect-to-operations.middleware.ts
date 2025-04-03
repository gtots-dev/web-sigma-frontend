import { NextResponse, type NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

import { PATHNAMES } from '../../configs/pathnames.config'
import { JwtTokenDecodeFactory } from '../../factories/jwt-decode.factory'
import { SelectOperationFactory } from '@/modules/api/infrastructure/factories/select-operation.factory'
import { OperationFactory } from '@/modules/operations/infrastructure/factories/operation.factory'

export async function RedirectToOperationsMiddleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET })

  if (!token?.accessToken) return NextResponse.next()

  const jwtDecode = JwtTokenDecodeFactory.create()
  const { operation_ids } = jwtDecode.decode(token.accessToken)

  if (!operation_ids?.length) return NextResponse.next()

  const currentPathname = req.nextUrl.pathname
  const { SYSTEM, OPERATIONS, OPERATION_OPTIONS } = PATHNAMES

  if (currentPathname === SYSTEM) {
    const response = NextResponse.redirect(
      new URL(
        operation_ids.length === 1 ? OPERATION_OPTIONS : OPERATIONS,
        req.url
      )
    )

    if (operation_ids.length === 1) {
      const repository = SelectOperationFactory.create(req, response)
      const operation = OperationFactory.create({
        id: String(operation_ids[0]),
        name: 'operation-automatic'
      })
      repository.saveToCookies(operation)
    }

    return response
  }

  return NextResponse.next()
}
