'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useDialog } from './view-more-activity-report-menu-provider.component'
import { ViewMoreActivityReportMenu } from '.'
import { useTableActivityReport } from '../../contexts/table-activity-report.context'
import { useFormattedDate } from '@/modules/shared/presentation/hooks/use-formatted-date.hook'
import { MESSAGES_LOGS } from '@/modules/shared/presentation/messages/logs'
import { Input } from '@/modules/shared/presentation/components/shadcn/input'
import { Label } from '@/modules/shared/presentation/components/shadcn/label'

interface ViewMoreActivityReportMenuComponentProps {
  title: string
}

export function ViewMoreActivityReportMenuComponent({
  title
}: ViewMoreActivityReportMenuComponentProps) {
  const { action, contract, created_at, data, operation, user } =
    useTableActivityReport()
  const { formatted } = useFormattedDate(created_at)
  const { close } = useDialog()

  return (
    <ViewMoreActivityReportMenu.Root>
      <ViewMoreActivityReportMenu.Content>
        <ViewMoreActivityReportMenu.Header
          title={title}
          description={`${MESSAGES_LOGS[action]} pelo usuário ${user.name} às ${formatted}`}
        />

        <main className="flex flex-col flex-1 h-full w-full gap-y-8 overflow-auto p-8">
          <ViewMoreActivityReportMenu.Group>
            <ViewMoreActivityReportMenu.Item.data
              title="Nome de usuário"
              notFoundData="Sem Informação"
            >
              {user?.name}
            </ViewMoreActivityReportMenu.Item.data>
            <ViewMoreActivityReportMenu.Item.data
              title="Ação"
              notFoundData="Sem Informação"
            >
              {MESSAGES_LOGS[action]}
            </ViewMoreActivityReportMenu.Item.data>
            <ViewMoreActivityReportMenu.Item.data
              title="Realizado"
              notFoundData="Sem Informação"
            >
              {formatted}
            </ViewMoreActivityReportMenu.Item.data>
            <ViewMoreActivityReportMenu.Item.data
              title="Contrato"
              notFoundData="Sem Informação"
            >
              {contract?.name}
            </ViewMoreActivityReportMenu.Item.data>
            <ViewMoreActivityReportMenu.Item.data
              title="Operação"
              notFoundData="Sem Informação"
            >
              {operation?.name}
            </ViewMoreActivityReportMenu.Item.data>
          </ViewMoreActivityReportMenu.Group>

          <ViewMoreActivityReportMenu.Group cols={1}>
            <ViewMoreActivityReportMenu.Item.data
              title="Formulário Enviado"
              notFoundData="Sem Informação"
            >
              {data && Object.keys(data).length > 0 && (
                <div className="p-4 bg-zinc-900/50 border rounded-md flex flex-col gap-y-3">
                  {Object.entries(data).map(([key, value]) => (
                    <Label key={key} className="flex flex-col gap-y-2">
                      <span className="opacity-70">
                        {key
                          .replace(/_/g, ' ')
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </span>
                      <Input value={value || 'Sem Informação'} disabled />
                    </Label>
                  ))}
                </div>
              )}
            </ViewMoreActivityReportMenu.Item.data>
          </ViewMoreActivityReportMenu.Group>
        </main>

        <ViewMoreActivityReportMenu.Footer>
          <Button
            className="w-full sm:w-[150px]"
            variant="outline"
            onClick={close}
          >
            Fechar
          </Button>
        </ViewMoreActivityReportMenu.Footer>
      </ViewMoreActivityReportMenu.Content>
    </ViewMoreActivityReportMenu.Root>
  )
}
