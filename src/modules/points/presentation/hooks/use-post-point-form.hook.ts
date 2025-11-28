'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMemo } from 'react'
import {
  PostPointFormSchema,
  type PostPointFormType
} from '../schemas/post-point-form.schema'
import type { PointEntity } from '../../domain/entities/point.entity'

export function usePostPointForm() {
  const defaultValues = useMemo<PointEntity>(
    () => ({
      name: '',
      description: '',
      cfg: ''
    }),
    []
  )

  const methods = useForm<PostPointFormType>({
    resolver: zodResolver(PostPointFormSchema),
    defaultValues
  })

  return {
    defaultValues,
    methods
  }
}
