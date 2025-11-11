'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMemo } from 'react'
import {
  AddProcessingUnitFormSchema,
  type AddProcessingUnitFormType
} from '../schemas/add-processing-unit-form.schema'
import type { ProcessingUnitEntity } from '../../domain/entities/processing-unit.entity'

export function useAddProcessingUnitForm() {
  const defaultValues = useMemo<ProcessingUnitEntity>(
    () => ({
      name: '',
      cfg: ''
    }),
    []
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
