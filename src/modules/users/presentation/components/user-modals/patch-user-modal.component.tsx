'use client'

import { FormProvider } from 'react-hook-form'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ModalShell } from '@/modules/shared/presentation/components/modal-shell'
import { useModalNavigation } from '@/modules/shared/presentation/hooks/use-modal-navigation.hook'
import { UserForm } from '../user-form'
import { useUserById } from '../../hooks/use-user-by-id.hook'
import { usePatchUserForm } from '../../hooks/use-patch-user-form.hook'
import { useEditUserSubmit } from '../../hooks/use-patch-user-submit.hook'
import type { UserWithFiles } from '@/modules/users/domain/types/user-with-files'

export interface PatchUserModalProps {
  title: string
  description: string
  userId: number
  onClose?: () => void
  onReturn?: () => void
}

export function PatchUserModal({
  title,
  description,
  userId,
  onClose,
  onReturn
}: PatchUserModalProps) {
  const { handleClose, handleReturn } = useModalNavigation({
    onClose,
    onReturn
  })
  const { user, loading } = useUserById(userId)
  const { methods } = usePatchUserForm(user)
  const { onAction } = useEditUserSubmit()

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
    <ModalShell.Root>
      <ModalShell.Loading when={loading} />

      {!loading && user && (
        <>
          <ModalShell.Header title={title} description={description} />
          <FormProvider {...methods}>
            <ModalShell.Content>
              <UserForm.Form>
                <UserForm.Input.Name require />
                <UserForm.Input.Email require />
                <UserForm.Input.Company require />
                <UserForm.Input.Position require />
                <UserForm.Input.Username require />
                <UserForm.Input.Description />
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
                onSubmit={(data: UserWithFiles) => onAction(data, handleClose)}
              />
            </ModalShell.Footer>
          </FormProvider>
        </>
      )}
    </ModalShell.Root>
  )
}
