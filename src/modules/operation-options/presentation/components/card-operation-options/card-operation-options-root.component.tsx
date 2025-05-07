import type { ReactNode } from 'react'

interface CardOperationOptionsRootComponentProps {
  children: ReactNode
}

export function CardOperationOptionsRootComponent({
  children
}: CardOperationOptionsRootComponentProps) {
  return (
    <section className="flex flex-col flex-1 bg-zinc-50 dark:bg-zinc-900 p-8 sm:p-10 sm:pb-0">
      <div className="flex flex-col flex-1 gap-y-8 sm:gap-y-16 items-center max-w-5xl lg:mx-auto">
        {children}
      </div>
    </section>
  )
}
