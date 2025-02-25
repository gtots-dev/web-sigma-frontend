import type { ComponentProps } from 'react'

interface AuthenticationFormCardTitleComponentProps
  extends ComponentProps<'h1'> {
  title: string
}

export function AuthenticationFormCardTitleComponent({
  title,
  ...props
}: AuthenticationFormCardTitleComponentProps) {
  return (
    <h1 className="text-start text-[36px] font-medium dark:text-zinc-50" {...props}>
      {title}
    </h1>
  )
}
