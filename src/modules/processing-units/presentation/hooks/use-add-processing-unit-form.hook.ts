'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMemo } from 'react'
import {
  AddProcessingUnitFormSchema,
  type AddProcessingUnitFormType
} from '../schemas/add-processing-unit-form.schema'
import { useParams } from 'next/navigation'
import type { ProcessingUnitEntity } from '../../domain/entities/processing-unit.entity'

export function useAddProcessingUnitForm() {
  const { operationId, contractId } = useParams()
  const defaultValues = useMemo<ProcessingUnitEntity>(
    () => ({
      name: '',
      cfg: '',
    }),
    [operationId, contractId]
  )

  const methods = useForm<AddProcessingUnitFormType>({
    resolver: zodResolver(AddProcessingUnitFormSchema),
    defaultValues
  })

  return {
    defaultValues,
    methods
  }
}
