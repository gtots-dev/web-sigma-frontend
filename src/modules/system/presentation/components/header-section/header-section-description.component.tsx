import type { ComponentProps } from 'react'
import { cn } from '@/modules/shared/presentation/lib/utils'

export interface HeaderSectionDescriptionComponentProps extends ComponentProps<'div'> {}

export function HeaderSectionDescriptionComponent({
  className,
  children,
  ...props
}: HeaderSectionDescriptionComponentProps) {
  return (
    <div
      className={cn(
        'text-xs leading-relaxed text-muted-foreground flex items-center gap-1.5 min-w-0 truncate',
        className
      )}
      {...props}
    >
      <span className="truncate min-w-0">{children}</span>
    </div>
  )
}
