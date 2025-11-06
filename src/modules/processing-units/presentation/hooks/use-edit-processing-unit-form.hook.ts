'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMemo } from 'react'

import type { ProcessingUnitEntity } from '../../domain/entities/processing-unit.entity'
import {
  EditProcessingUnitFormSchema,
  type EditProcessingUnitFormType
} from '../schemas/edit-processing-unit-form.schema'

export function useEditProcessingUnitForm(
  processingUnit: ProcessingUnitEntity
) {
  const defaultValues = useMemo<ProcessingUnitEntity>(
    () => ({
      id: processingUnit.id,
      name: processingUnit.name,
      cfg: JSON.stringify(
        processingUnit?.cfg === null ? {} : processingUnit?.cfg
      ),
      contract_id: processingUnit.contract_id,
      operation_id: processingUnit.operation_id
    }),
    [processingUnit]
  )

  const methods = useForm<EditProcessingUnitFormType>({
    resolver: zodResolver(EditProcessingUnitFormSchema),
    defaultValues
  })

  return {
    defaultValues,
    methods
  }
}
