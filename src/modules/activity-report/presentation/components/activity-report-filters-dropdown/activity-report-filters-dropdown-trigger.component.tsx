'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { DropdownMenuTrigger } from '@/modules/shared/presentation/components/shadcn/dropdown-menu'
import { Filter } from 'lucide-react'
import type { ComponentProps } from 'react'

export function ActivityReportFiltersDropdownTriggerComponent(
  props: ComponentProps<'button'>
) {
  return (
    <DropdownMenuTrigger asChild {...props}>
      <Button variant="primary" aria-label="Filtros">
        <Filter /> Filtros
      </Button>
    </DropdownMenuTrigger>
  )
}
