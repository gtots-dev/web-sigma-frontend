'use client'

import { useCallback } from 'react'
import { useParams } from 'next/navigation'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'

import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { GroupSubgroupInterface } from '../../domain/interfaces/group-subgroup.interface'

import { useGroupStore } from '@/modules/groups/presentation/stores/group.store'
import { useTableGroup } from '../contexts/table-group.context'

export function usePostGroupSubgroupSubmit() {
  const { operationId, contractId }: UrlParams = useParams()
  const { group } = useTableGroup()

  const {
    getGroups,
    postGroupSubgroup,
    deleteGroupSubgroup,
    groups
  } = useGroupStore()

  const onAction = useCallback(
    async (
      { subgroupId: formSubgroupIds }: GroupSubgroupInterface,
      onSuccess?: VoidFunction
    ) => {
      try {
        if (!group?.id) return

        const apiSubgroupsSelected =
          groups.find((item) => item.group.id === group.id)?.group_id ?? []

        const toAdd = formSubgroupIds.filter(
          (id) => !apiSubgroupsSelected.includes(id)
        )

        const toDelete = apiSubgroupsSelected.filter(
          (id) => !formSubgroupIds.includes(id)
        )

        for (const subgroupId of toAdd) {
          await postGroupSubgroup(
            {
              operationId,
              contractId,
              groupId: String(group.id)
            },
            subgroupId
          )
        }

        for (const subgroupId of toDelete) {
          await deleteGroupSubgroup({
            operationId,
            contractId,
            groupId: String(group.id),
            subgroupId: String(subgroupId)
          })
        }

        await getGroups({ contractId, operationId })

        toast({
          title: 'Grupo atualizado com sucesso!',
          variant: 'success'
        })

        onSuccess?.()
      } catch (error) {
        if (error instanceof HttpResponseError) {
          toast({
            title: 'Erro ao atualizar o grupo',
            description:
              'Ocorreu um problema ao tentar atualizar. Verifique e tente novamente.',
            variant: 'destructive'
          })
        }
      }
    },
    [
      postGroupSubgroup,
      deleteGroupSubgroup,
      getGroups,
      groups,
      group?.id,
      operationId,
      contractId
    ]
  )

  return { onAction }
}
