'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMemo } from 'react'

import type { PointEntity } from '../../domain/entities/point.entity'
import {
  PatchPointFormSchema,
  type PatchPointFormType
} from '../schemas/patch-point-form.schema'

export function usePatchPointForm(point: PointEntity) {
  const defaultValues = useMemo<PointEntity>(
    () => ({
      id: point.id,
      name: point.name ?? '',
      description: point?.description ?? '',
      cfg: JSON.stringify(point.cfg === null ? {} : point.cfg)
    }),
    [point]
  )

  const methods = useForm<PatchPointFormType>({
    resolver: zodResolver(PatchPointFormSchema),
    defaultValues
  })

  return {
    defaultValues,
    methods
  }
}
