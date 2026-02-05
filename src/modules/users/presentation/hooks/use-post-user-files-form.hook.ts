'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMemo } from 'react'
import {
  PostUserFilesFormSchema,
  type PostUserFilesFormType
} from '../schemas/post-user-files-form.schema'
import type { UserFilesInterface } from '../../domain/interfaces/user-files.interface'

export function usePostUserFilesForm() {
  const defaultValues = useMemo<UserFilesInterface>(
    () => ({
      files: []
    }),
    []
  )

  const methods = useForm<PostUserFilesFormType>({
    resolver: zodResolver(PostUserFilesFormSchema),
    defaultValues
  })

  return {
    defaultValues,
    methods
  }
}
