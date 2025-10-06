import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import type { PasswordResetFormInterface } from '../../domain/interfaces/password-reset-form.interface'
import { usePasswordResetStore } from '../stores/password-reset.store'
import { redirect } from 'next/navigation'
import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'

export function usePasswordResetSubmit() {
  const { updatePasswordReset } = usePasswordResetStore()

  const onAction = useCallback(
    async (
      { newPassword }: PasswordResetFormInterface,
      token: string
    ): Promise<void> => {
      try {
        await updatePasswordReset({ token, newPassword })
        toast({
          title: 'Senha atualizada com sucesso!',
          description:
            'Em segundos será redirecionado para a seção de autenticação',
          variant: 'success'
        })
        setTimeout(() => {
          redirect(PATHNAMES.AUTHENTICATION)
        }, 1000)
      } catch {
        toast({
          title: 'Erro ao atualizar senha',
          description:
            'Verifique os dados do formulário ou solicite nova redefinição de senha.',
          variant: 'destructive'
        })
      }
    },
    [updatePasswordReset]
  )

  return { onAction }
}
