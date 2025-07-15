import type { ComponentProps } from 'react'

interface PasswordResetFormCardTitleComponentProps
  extends ComponentProps<'h1'> {
  title: string
}

export function PasswordResetFormCardTitleComponent({
  title,
  ...props
}: PasswordResetFormCardTitleComponentProps) {
  return (
    <h1
      className="text-start text-[36px] font-medium dark:text-zinc-50"
      {...props}
    >
      {title}
    </h1>
  )
}
