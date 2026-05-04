'use client'

import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useParams } from 'next/navigation'
import type { GroupEntity } from '../../domain/entities/group.entity'
import { useGroupStore } from '../stores/group.store'
import { useTwoFactorChallenge } from '@/modules/two-factor/presentation/contexts/two-factor-challenge.context'

export function usePatchGroupSubmit() {
  const { operationId, contractId }: UrlParams = useParams()
  const { getGroups, patchGroup } = useGroupStore()
  const { challenge } = useTwoFactorChallenge()

  const onAction = useCallback(
    async (group: GroupEntity, onSuccess: VoidFunction): Promise<void> => {
      const twoFactorCode = await challenge()
      if (!twoFactorCode) return

      try {
        await patchGroup({ operationId, contractId }, group)
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
    [getGroups, patchGroup, operationId, contractId, challenge]
  )

  return { onAction }
}
