'use client'

import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { RestrictionEntity } from '../../domain/entities/restriction.entity'
import {
  postRestrictionSchema,
  type PostRestrictionFormType
} from './use-post-restriction-schema.hook'

export function usePostRestrictionForm() {
  const defaultValues = useMemo<RestrictionEntity>(
    () => ({
      name: '',
      code: 1
    }),
    []
  )

  const methods = useForm<PostRestrictionFormType>({
    resolver: zodResolver(postRestrictionSchema),
    defaultValues
  })

  return { defaultValues, methods }
}
