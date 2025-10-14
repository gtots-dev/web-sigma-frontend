'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { HardDrive } from 'lucide-react'
import { useDialog } from './add-processing-unit-menu-provider.component'

export function AddProcessingUnitMenuTriggerComponent() {
  const { open } = useDialog()
  return (
    <Button variant="primary" className="w-full sm:w-auto" onClick={open}>
      <HardDrive />
      <span className="truncate">Adicionar Unidade de Processamento</span>
    </Button>
  )
}
