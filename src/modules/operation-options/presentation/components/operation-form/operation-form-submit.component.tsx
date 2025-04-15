'use client'

import type { OperationInterface } from '@/modules/operations/domain/interfaces/operation.interface'
import { useSetSelectOperation } from '@/modules/operations/presentation/hooks/use-set-selection-operation.hook'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useFormContext } from 'react-hook-form'

interface OperationFormSubmitComponentProps {
  close: VoidFunction
}

export function OperationFormSubmitComponent({
  close
}: OperationFormSubmitComponentProps) {
  const { setOperation } = useSetSelectOperation()
  const { handleSubmit } = useFormContext()

  const onSubmit = ({ operation }: { operation: OperationInterface }) => {
    setOperation(operation)
    close()
  }

  return (
    <Button
      className="w-[150px] text-sm bg-primary-600 text-zinc-50 hover:bg-primary-600/90"
      type="submit"
      onClick={handleSubmit(onSubmit)}
    >
      Confirmar
    </Button>
  )
}
