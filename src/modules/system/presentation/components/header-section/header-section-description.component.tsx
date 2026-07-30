import type { ComponentProps } from 'react'
import { cn } from '@/modules/shared/presentation/lib/utils'

export interface HeaderSectionDescriptionComponentProps extends ComponentProps<'p'> {}

export function HeaderSectionDescriptionComponent({
  className,
  children,
  ...props
}: HeaderSectionDescriptionComponentProps) {
  return (
    <p
      className={cn(
        'text-xs leading-[1.3rem] text-muted-foreground flex items-center gap-1.5 truncate',
        className
      )}
      {...props}
    >
      <span className="truncate">{children}</span>
    </p>
  )
}
