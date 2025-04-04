import { NextResponse, type NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { PATHNAMES } from '../../configs/pathnames.config'
import { JwtTokenDecodeFactory } from '../../factories/jwt-decode.factory'
import { SelectOperationFactory } from '@/modules/api/infrastructure/factories/select-operation.factory'
import { OperationFactory } from '@/modules/operations/infrastructure/factories/operation.factory'
import { GetOperationsFactory } from '@/modules/operations/infrastructure/factories/get-operations.factory'

export async function RedirectToOperationsMiddleware(req: NextRequest) {
  const getOperation = GetOperationsFactory.create()
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
      const operation = await getOperation.execute(operation_ids)
      const repository = SelectOperationFactory.create(req, response)      
      repository.saveToCookies(OperationFactory.create(operation[0]))
    }

    return response
  }

  return NextResponse.next()
}
