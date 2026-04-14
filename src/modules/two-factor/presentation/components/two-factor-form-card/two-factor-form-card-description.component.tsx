import type { ComponentProps } from 'react'

interface TwoFactorFormCardDescriptionComponentProps
  extends ComponentProps<'p'> {
  description: string
}

export function TwoFactorFormCardDescriptionComponent({
  description,
  ...props
}: TwoFactorFormCardDescriptionComponentProps) {
  return (
    <p
      className="text-start text-black/50 dark:text-zinc-50/60 text-sm"
      {...props}
    >
      {description}
    </p>
  )
}
