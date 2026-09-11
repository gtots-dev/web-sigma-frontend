'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { MultiSelect } from '@/modules/shared/presentation/components/multi-select/multi-select.component'
import { SystemFilters } from '@/modules/shared/presentation/components/system-filters'
import { Download, FileSpreadsheet } from 'lucide-react'
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
    <SystemFilters.Root defaultOpen={false} className="shadow-none">
      <SystemFilters.Header>
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
          <SystemFilters.Icon>
            <FileSpreadsheet className="w-4 h-4" />
          </SystemFilters.Icon>
          <div className="min-w-0 flex-1">
            <SystemFilters.Title>Exportar dados em CSV</SystemFilters.Title>
            <SystemFilters.Description>
              Selecione os modelos desejados para baixar os relatórios tabulares em arquivo CSV
            </SystemFilters.Description>
          </div>
        </div>
        <SystemFilters.Toggle />
      </SystemFilters.Header>

      <SystemFilters.Body>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full">
          <div className="flex-1">
            <MultiSelect
              items={models}
              value={selectedModels}
              className="!w-full"
              leftIcon={FileSpreadsheet}
              onChange={(value) => setSelectedModels(value)}
              placeholder="Selecionar modelos"
              notFoundItemPlaceholder="Nenhum modelo encontrado"
            />
          </div>

          <Button
            variant="primary"
            className="sm:w-[150px] shrink-0"
            disabled={selectedModels.length === 0}
            onClick={() =>
              selectedModels.map((model) =>
                onExport(model as keyof TrafficFlowInterface)
              )
            }
          >
            <Download className="w-4 h-4 mr-1.5" />
            Exportar
          </Button>
        </div>
      </SystemFilters.Body>
    </SystemFilters.Root>
  )
}
