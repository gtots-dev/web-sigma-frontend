import type { ReactNode } from 'react'

interface GroupComponentProps {
  children: ReactNode
}

export function GroupFormComponent({
  children
}: GroupComponentProps) {
  return (
    <main className="flex flex-col flex-1 h-full w-full gap-y-8 overflow-auto">
      <form
        className="flex flex-1 flex-col gap-y-5 px-5 py-5 sm:py-6 sm:px-10 w-full"
        autoComplete="off"
      >
        {children}
      </form>
    </main>
  )
}
