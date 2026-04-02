'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { MultiSelect } from '@/modules/shared/presentation/components/multi-select/multi-select.component'
import { Download } from 'lucide-react'
import type { TrafficFlowInterface } from '@/modules/traffic-flow/domain/interfaces/traffic-flow.interface'

export interface TrafficFlowModelsInterface {
  id: string
  label: string
  value: string
}

interface TrafficFlowExportRootProps {
  models: TrafficFlowModelsInterface[]
  selectedModels: (string | number)[]
  setSelectedModels: (v: (string | number)[]) => void
  onExport: (model: keyof TrafficFlowInterface) => void
}

export function TrafficFlowExportRoot({
  models,
  selectedModels,
  setSelectedModels,
  onExport
}: TrafficFlowExportRootProps) {
  return (
    <div className="flex gap-x-2 border rounded-md p-5 items-end w-auto">
      <div className="flex flex-col gap-y-2 w-full">
        <span className="text-sm font-medium">Baixar modelos em CSV:</span>

        <MultiSelect
          items={models}
          value={selectedModels}
          className="!w-full"
          onChange={(value) => setSelectedModels(value)}
          placeholder="Selecionar modelos"
          notFoundItemPlaceholder="Nenhum modelo encontrado"
        />
      </div>

      <Button
        size="icon"
        variant="outline"
        onClick={() =>
          selectedModels.map((model) =>
            onExport(model as keyof TrafficFlowInterface)
          )
        }
      >
        <Download />
      </Button>
    </div>
  )
}
