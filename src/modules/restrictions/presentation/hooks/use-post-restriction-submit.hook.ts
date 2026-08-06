'use client'

import { useParams } from 'next/navigation'
import { useRestrictionStore } from '../stores/restrictions.store'
import type { RestrictionEntity } from '../../domain/entities/restriction.entity'
import { useToast } from '@/modules/shared/presentation/components/hooks/use-toast'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export function usePostRestrictionSubmit() {
  const { operationId, contractId }: UrlParams = useParams()
  const { postRestriction, getRestrictions } = useRestrictionStore()
  const { toast } = useToast()

  const onAction = async (data: RestrictionEntity, close: () => void) => {
    try {
      await postRestriction(
        {
          operationId,
          contractId
        },
        data
      )
      toast({
        variant: 'success',
        title: 'Sucesso',
        description: 'Restrição criada com sucesso!'
      })
      await getRestrictions({
        operationId,
        contractId
      })
      close()
    } catch {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Erro ao criar restrição.'
      })
    }
  }

  return { onAction }
}
