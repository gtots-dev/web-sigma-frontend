'use client'

import { useFormContext, type FieldValues } from 'react-hook-form'
import { getDirtyValues } from '../utils/get-dirty-values.util'
import { toast } from '../components/hooks/use-toast'
import { useFormSubmitMode } from '../contexts/smart-form.context'

export function useSmartFormSubmit<T extends FieldValues = FieldValues>(
  onSubmit: (values: T | Partial<T>) => void
) {
  const { isPatch } = useFormSubmitMode()
  const {
    handleSubmit,
    formState: { dirtyFields, isDirty }
  } = useFormContext<T>()

  return handleSubmit((allValues) => {
    if (isPatch) {
      if (!isDirty) {
        toast({
          title: 'Nenhuma alteração foi realizada.',
          variant: 'default'
        })
        return
      }
      const mutatedValues = getDirtyValues(dirtyFields, allValues)
      onSubmit(mutatedValues)
    } else {
      onSubmit(allValues)
    }
  })
}
