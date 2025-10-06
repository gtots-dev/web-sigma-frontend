import type { ComponentProps } from 'react'

interface AuthenticationFormCardDescriptionComponentProps
  extends ComponentProps<'p'> {
  description: string
}

export function AuthenticationFormCardDescriptionComponent({
  description,
  ...props
}: AuthenticationFormCardDescriptionComponentProps) {
  return (
    <p
      className="text-start text-black/50 dark:text-zinc-50/60 text-sm"
      {...props}
    >
      {description}
    </p>
  )
}
