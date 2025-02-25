import { CircleHelp } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '../shadcn/dropdown-menu'
import type { ReactNode } from 'react'

interface HelpMeButtonComponentProps {
  description?: string
  children?: ReactNode
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'bottom' | 'left' | 'right'
  sideOffset?: number
  alignOffset?: number
}

export function HelpMeButtonComponent({
  description,
  children,
  align = 'start',
  side = 'bottom',
  sideOffset = 6,
  alignOffset
}: HelpMeButtonComponentProps) {
  if (!description) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:ring-0 focus:ring-offset-0 outline-none">
        {children || (
          <CircleHelp className="h-4 w-4 cursor-pointer text-zinc-900 hover:text-zinc-500 dark:text-white dark:hover:text-zinc-400 transition-colors" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        side={side}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        className="bg-white p-3 text-black dark:bg-zinc-950 dark:text-zinc-50 text-xs font-light border dark:border-zinc-800 rounded-md shadow-lg whitespace-pre-line max-w-xs"
      >
        {description}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
