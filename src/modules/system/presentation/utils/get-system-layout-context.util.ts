import { auth } from '@/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { JwtTokenDecodeFactory } from '@/modules/shared/infrastructure/factories/jwt-decode.factory'
import { isTokenExpired } from '@/modules/shared/presentation/utils/token-expired'
import { GetUserMeFactory } from '@/modules/users/infrastructure/factories/get-user-me.factory'
import type { UserPermissionsInterface } from '@/modules/users/domain/interfaces/user-permissions.interface'

export type SystemLayoutContextResult =
  | { state: 'error'; variant: 'server-error' | 'forbidden' }
  | {
      state: 'success'
      user: { name: string; email: string }
      userWithRole: { name: string; email: string; isAdmin: boolean }
      permissions: UserPermissionsInterface
    }

/**
 * Valida se a sessão atual, JWT e status de 2FA são válidos.
 * Se algum critério de segurança falhar, redireciona o usuário imediatamente.
 */
async function assertValidSession() {
  const session = await auth()
  const accessToken = session?.token?.access_token

  if (!session || !accessToken) {
    redirect(PATHNAMES.AUTHENTICATION)
  }

  const jwtFactory = JwtTokenDecodeFactory.create()
  const decodedToken = jwtFactory.decode(accessToken)
  const isExpired = isTokenExpired(decodedToken?.exp)

  if (!decodedToken || isExpired) {
    redirect(`${PATHNAMES.AUTHENTICATION}?session_expired=1`)
  }

  const cookieStore = await cookies()
  const hasTrustedDevice =
    cookieStore.has('trusted_device') ||
    cookieStore.has('__Secure-trusted_device')

  const requiresTwoFactor =
    decodedToken.type === '2fa_pending' && !hasTrustedDevice

  if (requiresTwoFactor) {
    redirect(PATHNAMES.TWO_FACTOR)
  }

  return { session, decodedToken }
}

/**
 * Busca os dados do usuário autenticado e trata os códigos de erro HTTP.
 */
async function fetchUserProfile(fallbackName: string) {
  try {
    const getUserMe = GetUserMeFactory.create()
    const result = await getUserMe.execute()

    return {
      user: {
        name: result.name || fallbackName,
        email: result.email || ''
      },
      error: null
    }
  } catch (error) {
    if (
      error instanceof HttpResponseError &&
      error.message.includes('Two-factor authentication not completed')
    )
      redirect(PATHNAMES.TWO_FACTOR)

    // 401 Unauthorized: sessão/token inválido no backend -> redireciona para login
    if (error instanceof HttpResponseError && error.status === 401)
      redirect(`${PATHNAMES.AUTHENTICATION}?session_expired=1`)

    // 403 Forbidden: autenticado porém sem permissão -> exibe estado de acesso negado
    if (error instanceof HttpResponseError && error.status === 403)
      return { user: null, error: 'forbidden' as const }

    // 5xx ou falha de conexão -> tela de instabilidade
    return { user: null, error: 'server-error' as const }
  }
}

/**
 * Orquestra a validação da sessão e carregamento do perfil para o layout do sistema.
 */
export async function getSystemLayoutContext(): Promise<SystemLayoutContextResult> {
  const { session, decodedToken } = await assertValidSession()

  const fallbackName = String(
    decodedToken.login_name || session.user?.username || 'Usuário'
  )
  const profile = await fetchUserProfile(fallbackName)

  if (profile.error || !profile.user)
    return { state: 'error', variant: profile.error ?? 'server-error' }

  const user = profile.user
  const userWithRole = { ...user, isAdmin: Boolean(session.user?.isAdmin) }

  return {
    state: 'success',
    user,
    userWithRole,
    permissions: decodedToken.permissions
  }
}
