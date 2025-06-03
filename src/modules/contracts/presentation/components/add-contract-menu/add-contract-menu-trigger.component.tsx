'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { FilePlus2 } from 'lucide-react'
import { useDialog } from './add-contract-menu-provider.component'

interface AddContractMenuTriggerComponentProps {}

export function AddContractMenuTriggerComponent({}: AddContractMenuTriggerComponentProps) {
  const { open } = useDialog()
  return (
    <Button variant="primary" className="w-full sm:w-auto" onClick={open}>
      <FilePlus2 />
      <span className="truncate">Adicionar Contrato</span>
    </Button>
  )
}
