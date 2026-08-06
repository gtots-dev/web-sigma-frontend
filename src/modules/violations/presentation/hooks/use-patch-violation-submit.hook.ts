'use client'

import { useParams } from 'next/navigation'
import { useViolationStore } from '../stores/violations.store'
import type { ViolationEntity } from '../../domain/entities/violation.entity'
import { useTableViolations } from '../contexts/table-violations.context'
import { useToast } from '@/modules/shared/presentation/components/hooks/use-toast'

export function usePatchViolationSubmit() {
  const { operationId, contractId } = useParams()
  const { patchViolation } = useViolationStore()
  const violation = useTableViolations()
  const { toast } = useToast()

  const onAction = async (data: ViolationEntity, close: () => void) => {
    try {
      await patchViolation(
        {
          operationId: String(operationId),
          contractId: String(contractId),
          violationId: String(violation.id)
        },
        data
      )
      toast({
        variant: 'success',
        title: 'Sucesso',
        description: 'Violação atualizada com sucesso!'
      })
      close()
    } catch {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Erro ao atualizar violação.'
      })
    }
  }

  return { onAction }
}
