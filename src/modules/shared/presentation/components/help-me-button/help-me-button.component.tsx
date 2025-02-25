import { CircleHelp } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '../shadcn/dropdown-menu'

interface HelpMeButtonComponentProps {
  description?: string
}

export function HelpMeButtonComponent({
  description
}: HelpMeButtonComponentProps) {
  if (!description) return null
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='rounded-full'>
        <CircleHelp className="h-4 w-4 cursor-pointer text-zinc-900 hover:text-zinc-500 dark:text-white dark:hover:text-zinc-400 transition-colors" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        side="bottom"
        sideOffset={6}
        className="bg-white p-3 text-black dark:bg-zinc-950 dark:text-zinc-50 text-xs font-light border dark:border-zinc-800 rounded-md shadow-lg whitespace-pre-line max-w-xs"
      >
        {description}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
