import { Inbox } from 'lucide-react'

export function InfractionsPanelEmpty() {
  return (
    <div className="flex flex-1 items-center justify-center text-muted-foreground bg-card border rounded-xl h-[calc(100vh-125px)]">
      <div className="flex flex-col items-center gap-2">
        <Inbox className="w-8 h-8 opacity-30 text-muted-foreground" />
        <span className="text-sm font-medium">
          Nenhuma infração registrada
        </span>
      </div>
    </div>
  )
}
