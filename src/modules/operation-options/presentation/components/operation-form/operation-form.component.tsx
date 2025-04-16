import type { ReactNode } from 'react'

interface OperationFormComponentProps {
  children: ReactNode
}

export function OperationFormComponent({
  children
}: OperationFormComponentProps) {
  return (
    <main className="flex flex-col flex-1 h-full w-full gap-y-8 py-6 px-10 overflow-hidden">
      <form className="flex flex-1 flex-col h-full w-full border rounded-lg">
        {children}
      </form>
    </main>
  )
}