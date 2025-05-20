import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { DropdownMenuTrigger } from '@/modules/shared/presentation/components/shadcn/dropdown-menu'
import { Ellipsis } from 'lucide-react'
import type { ComponentProps } from 'react'

interface UserOptionsDropdownTriggerComponentProps
  extends ComponentProps<'button'> {
  isInfoEnabled?: boolean
}

export function UserOptionsDropdownTriggerComponent({
  isInfoEnabled = true,
  ...props
}: UserOptionsDropdownTriggerComponentProps) {
  return (
    <DropdownMenuTrigger asChild {...props}>
      <Button size="icon" variant="ghost" aria-label="Mais ações">
        <Ellipsis />
      </Button>
    </DropdownMenuTrigger>
  )
}
