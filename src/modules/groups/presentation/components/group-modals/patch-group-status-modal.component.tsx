'use client'

import { FormProvider } from 'react-hook-form'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ModalShell } from '@/modules/shared/presentation/components/modal-shell'
import { useModalNavigation } from '@/modules/shared/presentation/hooks/use-modal-navigation.hook'
import { SmartFormProvider } from '@/modules/shared/presentation/contexts/smart-form.context'
import { GroupForm } from '../group-form'
import { usePatchGroupStatusForm } from '../../hooks/use-patch-group-status-form.hook'
import { usePatchGroupStatusSubmit } from '../../hooks/use-patch-group-status-submit.hook'
import { useGroupById } from '../../hooks/use-group-by-id.hook'
import type { GroupEnableAndDisableInterface } from '@/modules/groups/domain/interfaces/group-enable-and-disable.interface'

export interface PatchGroupStatusModalProps {
  title: string
  description: string
  groupId: number
  onClose?: () => void
  onReturn?: () => void
}

interface PatchGroupStatusFormBodyProps {
  title: string
  description: string
  group: GroupEnableAndDisableInterface
  onClose: () => void
}

function PatchGroupStatusFormBody({
  title,
  description,
  group,
  onClose
}: PatchGroupStatusFormBodyProps) {
  const { methods } = usePatchGroupStatusForm(group)
  const { onAction } = usePatchGroupStatusSubmit()

  const handleSubmit = (data: GroupEnableAndDisableInterface) =>
    onAction(data, onClose)

  return (
    <SmartFormProvider isPatch>
      <FormProvider {...methods}>
        <ModalShell.Header title={title} description={description} />
        <ModalShell.Content>
          <GroupForm.Form>
            <GroupForm.Input.Enabled />
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
          <GroupForm.Submit<GroupEnableAndDisableInterface>
            onSubmit={handleSubmit}
          />
        </ModalShell.Footer>
      </FormProvider>
    </SmartFormProvider>
  )
}

export function PatchGroupStatusModal({
  title,
  description,
  groupId,
  onClose,
  onReturn
}: PatchGroupStatusModalProps) {
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
    <ModalShell.Root contentClassName="lg:!w-[600px] lg:!h-auto">
      <ModalShell.Loading when={loading} />

      {group && (
        <PatchGroupStatusFormBody
          title={title}
          description={description}
          group={{ id: group.id, enabled: group.enabled }}
          onClose={handleClose}
        />
      )}
    </ModalShell.Root>
  )
}
