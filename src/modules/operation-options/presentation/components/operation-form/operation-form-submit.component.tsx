'use client'

import type { OperationInterface } from '@/modules/operations/domain/interfaces/operation.interface'
import { useToast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useOperationStore } from '@/modules/system/presentation/store/operation.store'
import { useFormContext } from 'react-hook-form'

interface OperationFormSubmitComponentProps {
  close: VoidFunction
}

export function OperationFormSubmitComponent({
  close
}: OperationFormSubmitComponentProps) {
  const { setOperation, operation: SelectOperation } = useOperationStore()
  const { toast } = useToast()
  const { handleSubmit } = useFormContext()

  const onSubmit = ({ operation }: { operation: OperationInterface }) => {
    if (operation.id === SelectOperation.id) {
      return toast({
        variant: 'destructive',
        title: 'Operação já selecionada',
        description: `A operação marcada já está selecionada. Escolha outra!`
      })
    }
    setOperation(operation)
    close()
    toast({
      variant: 'success',
      title: 'Operação selecionada',
      description: `Sua operação selecionada foi alterada para ${operation.name}`
    })
  }

  return (
    <Button
      className="w-full sm:w-[150px] text-sm bg-primary-600 text-zinc-50 hover:bg-primary-600/90"
      type="submit"
      onClick={handleSubmit(onSubmit)}
    >
      Confirmar
    </Button>
  )
}
