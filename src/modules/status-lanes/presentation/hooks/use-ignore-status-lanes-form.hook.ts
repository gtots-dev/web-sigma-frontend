'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  IgnoreStatusLanesFormSchema,
  type IgnoreStatusLanesFormType
} from '../schemas/ignore-status-lanes-form.schema'

export function useIgnoreStatusLanesForm(initialLaneIds: number[] = []) {
  const methods = useForm<IgnoreStatusLanesFormType>({
    resolver: zodResolver(IgnoreStatusLanesFormSchema),
    defaultValues: { laneIds: initialLaneIds }
  })

  return { methods }
}
