import type { ComponentProps } from 'react'

interface PasswordResetFormCardDescriptionComponentProps
  extends ComponentProps<'p'> {
  description: string
}

export function PasswordResetFormCardDescriptionComponent({
  description,
  ...props
}: PasswordResetFormCardDescriptionComponentProps) {
  return (
    <p className="text-start text-black/50 dark:text-zinc-50/60 text-sm" {...props}>
      {description}
    </p>
  )
}
