import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { DropdownMenuTrigger } from '@/modules/shared/presentation/components/shadcn/dropdown-menu'
import { Ellipsis } from 'lucide-react'
import type { ComponentProps } from 'react'

export function ActivityReportOptionsDropdownTriggerComponent(
  props: ComponentProps<'button'>
) {
  return (
    <DropdownMenuTrigger asChild {...props}>
      <Button className='h-[19px]' variant="ghost" aria-label="Mais ações">
        <Ellipsis />
      </Button>
    </DropdownMenuTrigger>
  )
}
