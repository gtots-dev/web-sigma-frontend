'use client'

import { useMemo } from 'react'
import { FormProvider } from 'react-hook-form'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ModalShell } from '@/modules/shared/presentation/components/modal-shell'
import { useModalNavigation } from '@/modules/shared/presentation/hooks/use-modal-navigation.hook'
import { GroupForm } from '../group-form'
import { usePostGroupSubgroupForm } from '../../hooks/use-post-group-subgroup-form.hook'
import { usePostGroupSubgroupSubmit } from '../../hooks/use-post-group-subgroup-submit.hook'
import { useGroupById } from '../../hooks/use-group-by-id.hook'
import type { GroupSubgroupInterface } from '@/modules/groups/domain/interfaces/group-subgroup.interface'
import type { GroupWithGroupInterface } from '@/modules/groups/domain/interfaces/group-with-group.interface'

export interface PostGroupSubgroupModalProps {
  title: string
  description: string
  groupId: number
  isPermittedGroups: boolean
  onClose?: () => void
  onReturn?: () => void
}

interface PostGroupSubgroupFormBodyProps {
  title: string
  description: string
  groupId: number
  isPermittedGroups: boolean
  subgroupsAvailableForSelection: GroupWithGroupInterface[]
  onClose: () => void
}

function PostGroupSubgroupFormBody({
  title,
  description,
  groupId,
  isPermittedGroups,
  subgroupsAvailableForSelection,
  onClose
}: PostGroupSubgroupFormBodyProps) {
  const { methods } = usePostGroupSubgroupForm(groupId)
  const { onAction } = usePostGroupSubgroupSubmit(groupId)

  const handleSubmit = (data: GroupSubgroupInterface) => onAction(data, onClose)

  return (
    <FormProvider {...methods}>
      <ModalShell.Header title={title} description={description} />
      <ModalShell.Content>
        <GroupForm.Form>
          <GroupForm.Input.Subgroups
            hasPermission={isPermittedGroups}
            subgroups={subgroupsAvailableForSelection}
          />
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
        <GroupForm.Submit<GroupSubgroupInterface> onSubmit={handleSubmit} />
      </ModalShell.Footer>
    </FormProvider>
  )
}

export function PostGroupSubgroupModal({
  title,
  description,
  groupId,
  isPermittedGroups,
  onClose,
  onReturn
}: PostGroupSubgroupModalProps) {
  const { handleClose, handleReturn } = useModalNavigation({
    onClose,
    onReturn
  })
  const { group, groups: subgroups, loading } = useGroupById(groupId)

  const subgroupsAvailableForSelection = useMemo(
    () => subgroups.filter((subgroupItem) => subgroupItem.group.id !== groupId),
    [subgroups, groupId]
  )

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

      {!loading && group && (
        <PostGroupSubgroupFormBody
          title={title}
          description={description}
          groupId={groupId}
          isPermittedGroups={isPermittedGroups}
          subgroupsAvailableForSelection={subgroupsAvailableForSelection}
          onClose={handleClose}
        />
      )}
    </ModalShell.Root>
  )
}
