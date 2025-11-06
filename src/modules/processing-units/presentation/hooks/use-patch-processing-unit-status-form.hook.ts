'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMemo } from 'react'
import { PutProcessingUnitStatusFormSchema, type PutProcessingUnitStatusFormType } from '../schemas/put-processing-unit-status-form.schema'
import type { ProcessingUnitEntity } from '../../domain/entities/processing-unit.entity'

export function usePatchProcessingUnitStatusForm(processingUnit: ProcessingUnitEntity) {
  const defaultValues = useMemo<Partial<ProcessingUnitEntity>>(
    () => ({
      id: processingUnit.id,
      enabled: processingUnit.enabled
    }),
    [processingUnit]
  )

  const methods = useForm<PutProcessingUnitStatusFormType>({
    resolver: zodResolver(PutProcessingUnitStatusFormSchema),
    defaultValues
  })

  return {
    defaultValues,
    methods
  }
}
