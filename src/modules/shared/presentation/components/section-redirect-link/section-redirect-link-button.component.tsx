import type { ComponentProps } from 'react'
import Link from 'next/link'
import { Button } from '../shadcn/button'
import { CornerUpLeft } from 'lucide-react'
import { cn } from '@/modules/shared/presentation/lib/utils'

export interface SectionRedirectLinkButtonComponentProps extends ComponentProps<
  typeof Button
> {
  href: string
  className?: string
}

export function SectionRedirectLinkButtonComponent({
  className,
  href,
  variant = 'outline',
  children,
  ...props
}: SectionRedirectLinkButtonComponentProps) {
  return (
    <Button
      className={cn(
        'h-9 w-9 shrink-0 aspect-square p-0 flex items-center justify-center',
        className
      )}
      variant={variant}
      asChild
      {...props}
    >
      <Link href={href} aria-label="Voltar">
        {children ?? <CornerUpLeft className="w-4 h-4" />}
      </Link>
    </Button>
  )
}
