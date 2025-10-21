'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ArrowUpDown } from 'lucide-react'
import { useDialog } from './add-lane-menu-provider.component'

export function AddLaneMenuTriggerComponent() {
  const { open } = useDialog()
  return (
    <Button variant="primary" className="w-full sm:w-auto" onClick={open}>
      <ArrowUpDown />
      <span className="truncate">Adicionar Faixa</span>
    </Button>
  )
}
