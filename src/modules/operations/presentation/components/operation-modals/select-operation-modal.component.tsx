'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ModalShell } from '@/modules/shared/presentation/components/modal-shell'
import { useModalNavigation } from '@/modules/shared/presentation/hooks/use-modal-navigation.hook'
import { useOperationStore } from '@/modules/system/presentation/store/operation.store'
import { OperationForm } from '../operation-form'
import type { OperationInterface } from '@/modules/operations/domain/interfaces/operation.interface'

export interface SelectOperationModalProps {
  title: string
  description: string
  operations?: OperationInterface[]
  onClose?: () => void
  onReturn?: () => void
}

export function SelectOperationModal({
  title,
  description,
  operations,
  onClose,
  onReturn
}: SelectOperationModalProps) {
  const { handleClose } = useModalNavigation({
    onClose,
    onReturn
  })
  const { operation, operations: storeOperations } = useOperationStore()
  const resolvedOperations =
    operations && operations.length > 0 ? operations : storeOperations

  return (
    <ModalShell.Root>
      <ModalShell.Header title={title} description={description} />
      <OperationForm.Provider operation={operation}>
        <ModalShell.Content className="flex flex-col overflow-hidden">
          <OperationForm.Form>
            <OperationForm.Search />
            <OperationForm.Radios operations={resolvedOperations} />
          </OperationForm.Form>
        </ModalShell.Content>
        <ModalShell.Footer>
          <Button
            className="w-full sm:w-[150px]"
            variant="outline"
            type="button"
            onClick={handleClose}
          >
            Cancelar
          </Button>
          <OperationForm.Submit />
        </ModalShell.Footer>
      </OperationForm.Provider>
    </ModalShell.Root>
  )
}
