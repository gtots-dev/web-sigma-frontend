'use client'

import { FormProvider } from 'react-hook-form'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ModalShell } from '@/modules/shared/presentation/components/modal-shell'
import { useModalNavigation } from '@/modules/shared/presentation/hooks/use-modal-navigation.hook'
import { UserForm } from '../user-form'
import { useUserById } from '../../hooks/use-user-by-id.hook'
import { usePostUserFilesForm } from '../../hooks/use-post-user-files-form.hook'
import { usePostUserFilesSubmit } from '../../hooks/use-post-user-files-submit.hook'
import type { UserFilesInterface } from '@/modules/users/domain/interfaces/user-files.interface'

export interface PostUserFilesModalProps {
  title: string
  description: string
  userId: number
  onClose?: () => void
  onReturn?: () => void
}

export function PostUserFilesModal({
  title,
  description,
  userId,
  onClose,
  onReturn
}: PostUserFilesModalProps) {
  const { handleClose, handleReturn } = useModalNavigation({
    onClose,
    onReturn
  })
  const { user, loading } = useUserById(userId)
  const { methods } = usePostUserFilesForm()
  const { onAction } = usePostUserFilesSubmit(userId)

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
    <ModalShell.Root contentClassName="lg:!w-[700px] lg:!h-auto">
      <ModalShell.Loading when={loading} />

      {!loading && user && (
        <>
          <ModalShell.Header title={title} description={description} />
          <FormProvider {...methods}>
            <ModalShell.Content>
              <UserForm.Form>
                <UserForm.Input.Files require />
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
                onSubmit={(files: UserFilesInterface) =>
                  onAction(files, handleClose)
                }
              />
            </ModalShell.Footer>
          </FormProvider>
        </>
      )}
    </ModalShell.Root>
  )
}
