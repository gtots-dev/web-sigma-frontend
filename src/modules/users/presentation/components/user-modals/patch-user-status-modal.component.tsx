'use client'

import { FormProvider } from 'react-hook-form'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ModalShell } from '@/modules/shared/presentation/components/modal-shell'
import { useModalNavigation } from '@/modules/shared/presentation/hooks/use-modal-navigation.hook'
import { UserForm } from '../user-form'
import { useUserById } from '../../hooks/use-user-by-id.hook'
import { usePatchUserStatusForm } from '../../hooks/use-patch-user-status-form.hook'
import { usePatchUserStatusSubmit } from '../../hooks/use-patch-user-status-submit.hook'
import type { UserEnableAndDisableInterface } from '@/modules/users/domain/interfaces/user-enable-and-disable.interface'

export interface PatchUserStatusModalProps {
  title: string
  description: string
  userId: number
  onClose?: () => void
  onReturn?: () => void
}

export function PatchUserStatusModal({
  title,
  description,
  userId,
  onClose,
  onReturn
}: PatchUserStatusModalProps) {
  const { handleClose, handleReturn } = useModalNavigation({
    onClose,
    onReturn
  })
  const { user, loading } = useUserById(userId)
  const methods = usePatchUserStatusForm({
    id: user?.id ?? userId,
    enabled: Boolean(user?.enabled)
  })
  const { onAction } = usePatchUserStatusSubmit()

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
                <UserForm.Input.Enabled name={user.name} />
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
                onSubmit={(userStatus: UserEnableAndDisableInterface) =>
                  onAction(userStatus, handleClose)
                }
              />
            </ModalShell.Footer>
          </FormProvider>
        </>
      )}
    </ModalShell.Root>
  )
}
