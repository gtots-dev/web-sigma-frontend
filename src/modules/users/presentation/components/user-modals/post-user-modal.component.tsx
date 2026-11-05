'use client'

import { FormProvider } from 'react-hook-form'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ModalShell } from '@/modules/shared/presentation/components/modal-shell'
import { useModalNavigation } from '@/modules/shared/presentation/hooks/use-modal-navigation.hook'
import { UserForm } from '../user-form'
import { usePostUserForm } from '../../hooks/use-post-user-form.hook'
import { useAddUserSubmit } from '../../hooks/use-post-user-submit.hook'
import type { UserWithFiles } from '@/modules/users/domain/types/user-with-files'

export interface PostUserModalProps {
  title: string
  description: string
  onClose?: () => void
  onReturn?: () => void
}

export function PostUserModal({
  title,
  description,
  onClose,
  onReturn
}: PostUserModalProps) {
  const { handleClose } = useModalNavigation({
    onClose,
    onReturn
  })
  const { methods } = usePostUserForm()
  const { onAction } = useAddUserSubmit()

  return (
    <ModalShell.Root>
      <ModalShell.Header title={title} description={description} />
      <FormProvider {...methods}>
        <ModalShell.Content>
          <UserForm.Form>
            <UserForm.Input.Name require />
            <UserForm.Input.Email require />
            <UserForm.Input.Company require />
            <UserForm.Input.Position require />
            <UserForm.Input.Username require />
            <UserForm.Input.PasswordRegDeadline require />
            <UserForm.Input.Files />
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
            onSubmit={(user: UserWithFiles) => onAction(user, handleClose)}
          />
        </ModalShell.Footer>
      </FormProvider>
    </ModalShell.Root>
  )
}
