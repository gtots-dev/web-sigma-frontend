'use client'

import { FormProvider } from 'react-hook-form'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ModalShell } from '@/modules/shared/presentation/components/modal-shell'
import { useModalNavigation } from '@/modules/shared/presentation/hooks/use-modal-navigation.hook'
import { SmartFormProvider } from '@/modules/shared/presentation/contexts/smart-form.context'
import { GroupForm } from '../group-form'
import { usePatchGroupForm } from '../../hooks/use-patch-group-form.hook'
import { usePatchGroupSubmit } from '../../hooks/use-patch-group-submit.hook'
import { useGroupById } from '../../hooks/use-group-by-id.hook'
import type { GroupEntity } from '@/modules/groups/domain/entities/group.entity'

export interface PatchGroupModalProps {
  title: string
  description: string
  groupId: number
  onClose?: () => void
  onReturn?: () => void
}

interface PatchGroupFormBodyProps {
  title: string
  description: string
  group: GroupEntity
  onClose: () => void
}

function PatchGroupFormBody({
  title,
  description,
  group,
  onClose
}: PatchGroupFormBodyProps) {
  const { methods } = usePatchGroupForm(group)
  const { onAction } = usePatchGroupSubmit()

  const handleSubmit = (data: GroupEntity) => onAction(data, onClose)

  return (
    <SmartFormProvider isPatch>
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
            onClick={onClose}
          >
            Cancelar
          </Button>
          <GroupForm.Submit<GroupEntity> onSubmit={handleSubmit} />
        </ModalShell.Footer>
      </FormProvider>
    </SmartFormProvider>
  )
}

export function PatchGroupModal({
  title,
  description,
  groupId,
  onClose,
  onReturn
}: PatchGroupModalProps) {
  const { handleClose, handleReturn } = useModalNavigation({
    onClose,
    onReturn
  })
  const { group, loading } = useGroupById(groupId)

  if (!loading && !group) {
    return (
      <ModalShell.Empty
        title="Grupo não encontrado"
        description={`O grupo solicitado com o ID ${groupId} não existe ou foi removido.`}
        onReturn={handleReturn}
      />
    )
  }

  return (
    <ModalShell.Root>
      <ModalShell.Loading when={loading} />

      {group && (
        <PatchGroupFormBody
          title={title}
          description={description}
          group={group}
          onClose={handleClose}
        />
      )}
    </ModalShell.Root>
  )
}
