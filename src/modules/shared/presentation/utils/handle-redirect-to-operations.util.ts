import { PATHNAMES } from '../../infrastructure/config/pathnames.config'
import { JwtTokenDecodeFactory } from '../../infrastructure/factories/jwt-decode.factory'

interface RedirectToOperationsParams {
  pathname: string
  accessToken?: string
  baseUrl: string
}

interface RedirectResult {
  shouldRedirect: boolean
  redirectUrl?: string
  selectedOperationId?: string
}

export function handleRedirectToOperationsUtil({
  pathname,
  accessToken,
  baseUrl
}: RedirectToOperationsParams): RedirectResult {
  if (!accessToken) return { shouldRedirect: false }

  const jwtDecode = JwtTokenDecodeFactory.create()
  const { operation_ids } = jwtDecode.decode(accessToken)

  if (!operation_ids?.length || pathname !== PATHNAMES.SYSTEM)
    return { shouldRedirect: false }

  const redirectPath =
    operation_ids.length === 1
      ? PATHNAMES.OPERATION_OPTIONS
      : PATHNAMES.OPERATIONS

  return {
    shouldRedirect: true,
    redirectUrl: new URL(redirectPath, baseUrl).toString(),
    selectedOperationId:
      operation_ids.length === 1 ? String(operation_ids[0]) : undefined
  }
}
