'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  IgnoreStatusProcessingUnitsFormSchema,
  type IgnoreStatusProcessingUnitsFormType
} from '../schemas/ignore-status-processing-units-form.schema'

export function useIgnoreStatusProcessingUnitsForm(
  initialProcessingUnitIds: number[] = []
) {
  const methods = useForm<IgnoreStatusProcessingUnitsFormType>({
    resolver: zodResolver(IgnoreStatusProcessingUnitsFormSchema),
    defaultValues: { processingUnitIds: initialProcessingUnitIds }
  })

  return { methods }
}
