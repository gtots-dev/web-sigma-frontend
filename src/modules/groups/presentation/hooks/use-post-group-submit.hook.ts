'use client'

import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useParams } from 'next/navigation'
import type { GroupEntity } from '../../domain/entities/group.entity'
import { useGroupStore } from '../stores/group.store'

export function usePostGroupSubmit() {
  const { getGroups, addGroup } = useGroupStore()
  const { operationId, contractId }: UrlParams = useParams()

  const onAction = useCallback(
    async (group: GroupEntity, onSuccess: VoidFunction): Promise<void> => {
      try {
        await addGroup({ operationId, contractId }, group)
        toast({
          title: 'Grupo adicionado com sucesso!',
          variant: 'success'
        })
        await getGroups({ operationId, contractId })
        onSuccess?.()
      } catch (error) {
        if (error instanceof HttpResponseError) {
          toast({
            title: 'Erro ao adicionar o grupo',
            description: error.message,
            variant: 'destructive'
          })
        }
      }
    },
    [getGroups, addGroup, operationId, contractId]
  )

  return { onAction }
}
