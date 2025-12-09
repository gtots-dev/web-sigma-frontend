'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMemo } from 'react'
import {
  PostGroupFormSchema,
  type PostGroupFormType
} from '../schemas/post-group-form.schema'
import type { GroupEntity } from '../../domain/entities/group.entity'

export function usePostGroupForm() {
  const defaultValues = useMemo<GroupEntity>(
    () => ({
      name: '',
      description: '',
      cfg: ''
    }),
    []
  )

  const methods = useForm<PostGroupFormType>({
    resolver: zodResolver(PostGroupFormSchema),
    defaultValues
  })

  return {
    defaultValues,
    methods
  }
}
