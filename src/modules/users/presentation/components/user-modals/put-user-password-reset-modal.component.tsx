'use client'

import { FormProvider } from 'react-hook-form'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ModalShell } from '@/modules/shared/presentation/components/modal-shell'
import { useModalNavigation } from '@/modules/shared/presentation/hooks/use-modal-navigation.hook'
import { UserForm } from '../user-form'
import { useUserById } from '../../hooks/use-user-by-id.hook'
import { usePutUserPasswordResetForm } from '../../hooks/use-put-user-password-reset-form.hook'
import { usePutUserPasswordResetSubmit } from '../../hooks/use-update-user-password-reset-submit.hook'
import type { UserPasswordResetInterface } from '@/modules/users/domain/interfaces/user-password-reset.interface'

export interface PutUserPasswordResetModalProps {
  title: string
  description: string
  userId: number
  onClose?: () => void
  onReturn?: () => void
}

export function PutUserPasswordResetModal({
  title,
  description,
  userId,
  onClose,
  onReturn
}: PutUserPasswordResetModalProps) {
  const { handleClose, handleReturn } = useModalNavigation({
    onClose,
    onReturn
  })
  const { user, loading } = useUserById(userId)
  const methods = usePutUserPasswordResetForm()
  const { onAction } = usePutUserPasswordResetSubmit(userId)

  if (!loading && !user) {
    return (
      <ModalShell.Empty
        title="Usuário não encontrado"
        description={`O usuário solicitado com o ID ${userId} não existe ou foi removido.`}
        onReturn={handleReturn}
      />
    )
  }

  return (
    <ModalShell.Root contentClassName="lg:!w-[600px] lg:!h-auto">
      <ModalShell.Loading when={loading} />

      {!loading && user && (
        <>
          <ModalShell.Header title={title} description={description} />
          <FormProvider {...methods}>
            <ModalShell.Content>
              <UserForm.Form>
                <UserForm.Input.PasswordRegDeadline />
              </UserForm.Form>
            </ModalShell.Content>
            <ModalShell.Footer>
              <Button
                className="w-full sm:w-[150px]"
                variant="outline"
                type="button"
                onClick={handleClose}
              >
                Cancelar
              </Button>
              <UserForm.Submit
                onSubmit={(userPasswordReset: UserPasswordResetInterface) =>
                  onAction(userPasswordReset, handleClose)
                }
              />
            </ModalShell.Footer>
          </FormProvider>
        </>
      )}
    </ModalShell.Root>
  )
}
