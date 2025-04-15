'use client'

import { MenuSelectOperation } from '@/modules/operation-options/presentation/components/menu-select-operation'
import type { OperationInterface } from '@/modules/operations/domain/interfaces/operation.interface'
import { useSelectedOperation } from '@/modules/operations/presentation/hooks/use-get-selection-operation.hook'
import { useState } from 'react'
import { OperationForm } from '../operation-form'

interface OperationSelectorRootProps {
  title: string
  description: string
  operations: OperationInterface[]
}

export function OperationSelectorRoot({
  title,
  description,
  operations
}: OperationSelectorRootProps) {
  const [open, setOpen] = useState(false)
  const operationSelect = useSelectedOperation()

  return (
    <MenuSelectOperation.Root open={open} onOpenChange={setOpen}>
      <MenuSelectOperation.Trigger />
      <MenuSelectOperation.Content title={title} description={description}>
        <OperationForm.Provider operation={operationSelect}>
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
