import { type NextRequest, NextResponse } from 'next/server'
import { PATHNAMES } from '../../configs/pathnames.config'
import { JwtTokenDecodeFactory } from '../../factories/jwt-decode.factory'
import { SelectOperationFactory } from '@/modules/api/infrastructure/factories/select-operation.factory'
import { OperationFactory } from '@/modules/operations/infrastructure/factories/operation.factory'
import { GetOperationsFactory } from '@/modules/operations/infrastructure/factories/get-operations.factory'
import { auth } from '@/auth'

export async function RedirectToOperationsMiddleware(req: NextRequest) {
  const { token } = await auth()
  if (!token?.access_token) return

  const jwtDecode = JwtTokenDecodeFactory.create()
  const { operation_ids } = jwtDecode.decode(token.access_token)
  if (!operation_ids?.length) return

  const currentPathname = req.nextUrl.pathname
  const { SYSTEM, OPERATIONS, OPERATION_OPTIONS } = PATHNAMES

  if (currentPathname !== SYSTEM) return

  const getOperation = GetOperationsFactory.create()
  const operations = await getOperation.execute(token, operation_ids)

  const response = NextResponse.redirect(
    new URL(
      operation_ids.length === 1 ? OPERATION_OPTIONS : OPERATIONS,
      req.url
    )
  )

  if (operation_ids.length === 1 && operations.length) {
    const repository = SelectOperationFactory.create(req, response)
    repository.saveToCookies(OperationFactory.create(operations[0]))
  }

  return response
}
