'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMemo } from 'react'
import {
  PostContractFilesFormSchema,
  type PostContractFilesFormType
} from '../schemas/post-contract-files-form.schema'
import type { ContractFilesInterface } from '../../domain/interfaces/contract-files.interface'

export function usePostContractFilesForm() {
  const defaultValues = useMemo<ContractFilesInterface>(
    () => ({
      files: []
    }),
    []
  )

  const methods = useForm<PostContractFilesFormType>({
    resolver: zodResolver(PostContractFilesFormSchema),
    defaultValues
  })

  return {
    defaultValues,
    methods
  }
}
