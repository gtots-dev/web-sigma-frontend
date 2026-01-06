'use client'

import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { useUserStore } from '../stores/user.store'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { UserPasswordResetInterface } from '../../domain/interfaces/user-password-reset.interface'
import { useUserPasswordResetStore } from '../stores/user-password-reset.store'
import { useParams } from 'next/navigation'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useTableUser } from '../contexts/table-user.context'

export function usePutUserPasswordResetSubmit() {
  const { getUsers } = useUserStore()
  const { id: userId } = useTableUser()
  const { operationId }: UrlParams = useParams()
  const { solicitedNewPassword } = useUserPasswordResetStore()

  const onAction = useCallback(
    async (
      userPasswordReset: UserPasswordResetInterface,
      onSuccess: VoidFunction
    ): Promise<void> => {
      try {
        await solicitedNewPassword(
          { operationId, userId: String(userId) },
          userPasswordReset
        )
        await getUsers({ operationId })
        toast({
          title: 'Redefinição de senha enviada com sucesso!',
          variant: 'success',
          description:
            'Verifique o e-mail do usuário selecionado, siga as instruções para redefinir a senha.'
        })
        onSuccess?.()
      } catch (error) {
        if (error instanceof HttpResponseError) {
          toast({
            title: 'Erro ao redefinir a senha',
            description:
              'Ocorreu um problema ao tentar solicitar a redefinição de senha. Verifique e tente novamente',
            variant: 'destructive'
          })
        }
      }
    },
    [solicitedNewPassword, getUsers, operationId, userId]
  )

  return { onAction }
}
