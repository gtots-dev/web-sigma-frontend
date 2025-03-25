import type { LucideIcon } from 'lucide-react'

interface CardOptionHeaderComponentProps {
  Icon: LucideIcon
}

export function CardOptionHeaderComponent({
  Icon
}: CardOptionHeaderComponentProps) {
  return (
    <div className="grid place-content-center px-16 py-10 sm:p-16">
      <Icon className="h-20 w-20 stroke-[1.2]" />
    </div>
  )
}
