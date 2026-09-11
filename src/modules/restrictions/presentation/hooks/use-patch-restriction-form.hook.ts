'use client'

import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { RestrictionEntity } from '../../domain/entities/restriction.entity'
import {
  patchRestrictionSchema,
  type PatchRestrictionFormType
} from './use-patch-restriction-schema.hook'

export function usePatchRestrictionForm(restriction: RestrictionEntity) {
  const defaultValues = useMemo<RestrictionEntity>(
    () => ({
      id: restriction?.id,
      name: restriction?.name ?? '',
      code: restriction?.code ?? 1,
      color: restriction?.color ?? '#000000'
    }),
    [restriction]
  )

  const methods = useForm<PatchRestrictionFormType>({
    resolver: zodResolver(patchRestrictionSchema),
    defaultValues
  })

  return { defaultValues, methods }
}
