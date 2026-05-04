import type { ComponentProps } from 'react'

interface TwoFactorFormCardTitleComponentProps
  extends ComponentProps<'h1'> {
  title: string
}

export function TwoFactorFormCardTitleComponent({
  title,
  ...props
}: TwoFactorFormCardTitleComponentProps) {
  return (
    <h1
      className="text-start text-[36px] font-medium dark:text-zinc-50"
      {...props}
    >
      {title}
    </h1>
  )
}
