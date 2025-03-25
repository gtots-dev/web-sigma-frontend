import { Building2, ChevronsUpDown } from 'lucide-react'

export function SelectOperationRootComponent({}) {
  return (
    <div className="h-16 flex bg-white dark:bg-zinc-950 border rounded-lg fill: w-full gap-x-3 p-3 xl:w-[350px]">
      <div className="grid place-content-center h-10 w-10 rounded-md bg-primary-600">
        <Building2 className="h-4 w-4 text-white" />
      </div>
      <div className="flex flex-col h-auto">
        <span className="font-bold text-sm">Operação</span>
        <span className="font-medium underline underline-offset-4 text-xs">
          São Paulo
        </span>
      </div>
      <div className="grid place-content-center h-10 w-10 rounded-md ms-auto">
        <ChevronsUpDown className="h-5 w-5" />
      </div>
    </div>
  )
}
