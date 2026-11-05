'use client'

import { FormProvider } from 'react-hook-form'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ModalShell } from '@/modules/shared/presentation/components/modal-shell'
import { useModalNavigation } from '@/modules/shared/presentation/hooks/use-modal-navigation.hook'
import { GroupForm } from '../group-form'
import { usePostGroupForm } from '../../hooks/use-post-group-form.hook'
import { usePostGroupSubmit } from '../../hooks/use-post-group-submit.hook'
import type { GroupEntity } from '@/modules/groups/domain/entities/group.entity'

export interface PostGroupModalProps {
  title: string
  description: string
  onClose?: () => void
  onReturn?: () => void
}

export function PostGroupModal({
  title,
  description,
  onClose,
  onReturn
}: PostGroupModalProps) {
  const { handleClose } = useModalNavigation({ onClose, onReturn })
  const { methods } = usePostGroupForm()
  const { onAction } = usePostGroupSubmit()

  const handleSubmit = (group: GroupEntity) => onAction(group, handleClose)

  return (
    <ModalShell.Root>
      <FormProvider {...methods}>
        <ModalShell.Header title={title} description={description} />
        <ModalShell.Content>
          <GroupForm.Form>
            <GroupForm.Input.Name require />
            <GroupForm.Input.Description />
            <GroupForm.Input.cfg />
          </GroupForm.Form>
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
          <GroupForm.Submit<GroupEntity> onSubmit={handleSubmit} />
        </ModalShell.Footer>
      </FormProvider>
    </ModalShell.Root>
  )
}
