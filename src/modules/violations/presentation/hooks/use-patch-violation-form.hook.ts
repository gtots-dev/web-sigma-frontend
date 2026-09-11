'use client'

import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ViolationEntity } from '../../domain/entities/violation.entity'
import {
  patchViolationSchema,
  type PatchViolationFormType
} from './use-patch-violation-schema.hook'

export function usePatchViolationForm(violation: ViolationEntity) {
  const defaultValues = useMemo<ViolationEntity>(
    () => ({
      id: violation?.id,
      name: violation?.name ?? '',
      code: violation?.code ?? 1,
      color: violation?.color ?? '#000000'
    }),
    [violation]
  )

  const methods = useForm<PatchViolationFormType>({
    resolver: zodResolver(patchViolationSchema),
    defaultValues
  })

  return { defaultValues, methods }
}
