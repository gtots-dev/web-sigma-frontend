import { type NextRequest, NextResponse } from 'next/server'
import { PATHNAMES } from '../../configs/pathnames.config'
import { JwtTokenDecodeFactory } from '../../factories/jwt-decode.factory'
import { SelectOperationFactory } from '@/modules/api/infrastructure/factories/select-operation.factory'
import { OperationFactory } from '@/modules/operations/infrastructure/factories/operation.factory'
import { GetOperationsFactory } from '@/modules/operations/infrastructure/factories/get-operations.factory'
import { auth } from '@/auth'

export async function RedirectToOperationsMiddleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl
  const { SYSTEM, OPERATIONS, OPERATION_OPTIONS, AUTHENTICATION } = PATHNAMES

  if (pathname !== SYSTEM) return

  const { token } = await auth()
  const accessToken = token?.access_token
  if (!accessToken) NextResponse.redirect(new URL(AUTHENTICATION, origin))

  const jwtDecoder = JwtTokenDecodeFactory.create()
  const { operation_ids: operationIds } = jwtDecoder.decode(accessToken)

  if (!operationIds?.length) return

  const getOperations = GetOperationsFactory.create()
  const operations = await getOperations.execute(token, operationIds)

  const hasSingleOperation = operationIds.length === 1
  const redirectTarget = hasSingleOperation ? OPERATION_OPTIONS : OPERATIONS
  const response = NextResponse.redirect(new URL(redirectTarget, origin))

  if (hasSingleOperation && operations.length) {
    const operation = OperationFactory.create(operations[0])
    const operationRepository = SelectOperationFactory.create(req, response)
    operationRepository.saveToCookies(operation)
  }

  return response
}
