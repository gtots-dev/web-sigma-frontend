'use client'

import { useRef } from 'react'
import { useFormContext, type FieldValues } from 'react-hook-form'
import { getDirtyValues } from '../utils/get-dirty-values.util'
import { toast } from '../components/hooks/use-toast'
import { useFormSubmitMode } from '../contexts/smart-form.context'

const isEmptyObject = (obj: object) =>
  Boolean(obj && Object.keys(obj).length === 0 && obj.constructor === Object)

export function useSmartFormSubmit<T extends FieldValues = FieldValues>(
  onSubmit: (values: T | Partial<T>) => Promise<void> | void
) {
  const { isPatch } = useFormSubmitMode()
  const isSubmittingRef = useRef(false)
  const {
    handleSubmit,
    formState: { dirtyFields, isDirty }
  } = useFormContext<T>()

  return handleSubmit(async (allValues) => {
    if (isSubmittingRef.current) return

    if (isPatch) {
      if (!isDirty || isEmptyObject(dirtyFields)) {
        toast({
          title: 'Nenhuma alteração foi realizada.',
          variant: 'default'
        })
        return
      }
      const mutatedValues = getDirtyValues(dirtyFields, allValues)
      isSubmittingRef.current = true
      try {
        await onSubmit(mutatedValues)
      } finally {
        isSubmittingRef.current = false
      }
    } else {
      isSubmittingRef.current = true
      try {
        await onSubmit(allValues)
      } finally {
        isSubmittingRef.current = false
      }
    }
  })
}
