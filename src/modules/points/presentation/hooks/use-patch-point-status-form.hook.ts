'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMemo } from 'react'
import {
  PatchPointStatusFormSchema,
  type PatchPointStatusFormType
} from '../schemas/patch-point-status-form.schema'
import type { PointEnableAndDisableInterface } from '../../domain/interfaces/point-enable-and-disable.interface'

export function usePatchPointStatusForm(point: PointEnableAndDisableInterface) {
  const defaultValues = useMemo<PointEnableAndDisableInterface>(
    () => ({
      id: point.id,
      enabled: point.enabled
    }),
    [point]
  )

  const methods = useForm<PatchPointStatusFormType>({
    resolver: zodResolver(PatchPointStatusFormSchema),
    defaultValues
  })

  return {
    defaultValues,
    methods
  }
}
