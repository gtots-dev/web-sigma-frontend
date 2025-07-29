'use client'

import { MenuSelectOperation } from '@/modules/operation-options/presentation/components/menu-select-operation'
import type { OperationInterface } from '@/modules/operations/domain/interfaces/operation.interface'
import { OperationForm } from '../operation-form'
import { useOperationSelector } from '../../hooks/use-operation-selector.hook'

interface OperationSelectorRootProps {
  title: string
  description: string
  operationId: OperationInterface['id']
  operations: OperationInterface[]
}

export function OperationSelectorRoot({
  title,
  description,
  operationId,
  operations
}: OperationSelectorRootProps) {
  const { open, setOpen, operation } = useOperationSelector(
    operationId,
    operations
  )

  return (
    <MenuSelectOperation.Root open={open} onOpenChange={setOpen}>
      <MenuSelectOperation.Trigger />
      <MenuSelectOperation.Content title={title} description={description}>
        <OperationForm.Provider operation={operation}>
          <OperationForm.Form>
            <OperationForm.Search />
            <OperationForm.Radios operations={operations} />
          </OperationForm.Form>
          <MenuSelectOperation.Footer>
            <OperationForm.Submit close={() => setOpen(false)} />
          </MenuSelectOperation.Footer>
        </OperationForm.Provider>
      </MenuSelectOperation.Content>
    </MenuSelectOperation.Root>
  )
}
