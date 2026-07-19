import type { ReactNode } from 'react'

interface InfractionDescriptionListProps {
  children: ReactNode
}

export function InfractionDescriptionList({ children }: InfractionDescriptionListProps) {
  return (
    <div
      className="flex-1 min-h-0 flex flex-col gap-4 p-4 overflow-y-auto
        [&::-webkit-scrollbar]:w-1
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:bg-border/50
        [&::-webkit-scrollbar-thumb]:rounded-full"
    >
      {children}
    </div>
  )
}

