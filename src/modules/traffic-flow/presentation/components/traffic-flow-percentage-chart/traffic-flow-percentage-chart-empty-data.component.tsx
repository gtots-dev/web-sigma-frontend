import { CardContent } from '@/modules/shared/presentation/components/shadcn/card'
import { SearchX } from 'lucide-react'

export function TrafficFlowPercentageChartEmptyData() {
  return (
    <CardContent className="flex flex-col h-[800px] justify-center p-6 border rounded-lg">
      <div className="flex flex-col items-center justify-center h-full text-center gap-3">
        <SearchX className="w-8 h-8 text-muted-foreground" />

        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">
            Nenhuma estatística encontrada
          </p>

          <p className="text-xs text-muted-foreground">
            Ajuste os filtros ou selecione outro período para visualizar o
            gráfico.
          </p>
        </div>
      </div>
    </CardContent>
  )
}
