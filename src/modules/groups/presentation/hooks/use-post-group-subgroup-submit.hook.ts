'use client'

import { useCallback } from 'react'
import { useParams } from 'next/navigation'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'

import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { GroupSubgroupInterface } from '../../domain/interfaces/group-subgroup.interface'

import { useGroupStore } from '@/modules/groups/presentation/stores/group.store'
export function usePostGroupSubgroupSubmit(groupId: number) {
  const { operationId, contractId }: UrlParams = useParams()

  const { getGroups, postGroupSubgroup, deleteGroupSubgroup, groups } =
    useGroupStore()

  const onAction = useCallback(
    async (
      { subgroupId: formSubgroupIds }: GroupSubgroupInterface,
      onSuccess?: VoidFunction
    ) => {
      try {
        if (!groupId) return

        const apiSubgroupsSelected =
          groups.find((item) => item.group.id === groupId)?.group_id ?? []

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
              groupId: String(groupId)
            },
            subgroupId
          )
        }

        for (const subgroupId of toDelete) {
          await deleteGroupSubgroup({
            operationId,
            contractId,
            groupId: String(groupId),
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
            description: error.message,
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
      groupId,
      operationId,
      contractId
    ]
  )

  return { onAction }
}
