import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import type { PasswordResetFormInterface } from '../../domain/interfaces/password-reset.interface'

export function usePasswordResetSubmit() {
  const onAction = useCallback(
    (
      { newPassword: new_password }: PasswordResetFormInterface,
      token: string
    ): void => {
      toast({
        title: 'Senha atualizada com sucesso!',
        description: JSON.stringify({ new_password, token })
      })
    },
    []
  )

  return { onAction }
}
