import { Cpu, Layers } from 'lucide-react'
import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { MonitoringMenuDetailsStatusGroup } from './monitoring-menu-details-status-group.component'
import { StatusGroup } from '../../../../domain/interfaces/monitoring-dashboard-websocket.interface'
import { getLevelColor, getLevelText } from '../../../utils/monitoring-menu-details.utils'

interface MonitoringMenuDetailsDialogProps {
  isOpen: boolean
  onClose: () => void
  title: string
  hasData: boolean
  offline: boolean
  level: number
  items: StatusGroup[]
  isUpDialog: boolean
}

export function MonitoringMenuDetailsDialog({ 
  isOpen, 
  onClose, 
  title,
  hasData,
  offline,
  level,
  items,
  isUpDialog
}: MonitoringMenuDetailsDialogProps) {
  return (
    <DrawerDialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose()
        }
      }}
    >
      <DrawerDialog.Content>
        {isOpen && (
          <div className="flex flex-col h-full">
            <DrawerDialog.Header className="!h-auto">
              <DrawerDialog.Title>
                <span className="flex items-center gap-2 text-base font-bold text-foreground">
                  {isUpDialog ? (
                    <Cpu size={18} className="text-muted-foreground" />
                  ) : (
                    <Layers size={18} className="text-muted-foreground" />
                  )}
                  <span>{title}</span>
                </span>
              </DrawerDialog.Title>
              <DrawerDialog.Description>
                <span className="flex items-center gap-2 mt-1.5">
                  <span
                    className={`h-2.5 w-2.5 rounded-full shrink-0 ${getLevelColor(
                      level,
                      hasData,
                      offline
                    )}`}
                  />
                  <span className="text-xs uppercase font-bold tracking-wider text-muted-foreground">
                    {getLevelText(
                      level,
                      hasData,
                      offline
                    )}
                  </span>
                </span>
              </DrawerDialog.Description>
            </DrawerDialog.Header>

            {/* Corpo do conteúdo com scroll */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length > 0 ? (
                items.map((group) => (
                  <MonitoringMenuDetailsStatusGroup key={group.group} group={group} />
                ))
              ) : (
                <div className="text-sm text-muted-foreground italic text-center py-10 bg-muted/10 border border-dashed rounded-lg">
                  Aguardando dados em tempo real...
                </div>
              )}
            </div>
          </div>
        )}
      </DrawerDialog.Content>
    </DrawerDialog.Root>
  )
}
