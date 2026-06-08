import { StatusGroup } from '../../../../domain/interfaces/monitoring-dashboard-websocket.interface'
import {
  formatBrDate,
  getLevelColor,
  getLevelText
} from '../../../utils/monitoring-menu-details.utils'

interface MonitoringMenuDetailsStatusGroupProps {
  group: StatusGroup
}

export function MonitoringMenuDetailsStatusGroup({
  group
}: MonitoringMenuDetailsStatusGroupProps) {
  return (
    <div key={group.group} className="flex flex-col gap-2 mt-2">
      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider pl-1">
        {group.group}
      </span>
      <div className="flex flex-col gap-1 bg-muted/20 border rounded-lg p-3">
        {group.elements.map((el) => {
          return (
            <div
              key={el.code || el.name}
              className="flex items-center justify-between text-sm py-1.5 px-1 border-b last:border-b-0 border-border/40"
            >
              <div className="flex flex-col min-w-0">
                <span
                  className="font-semibold text-foreground truncate max-w-[280px]"
                  title={el.name}
                >
                  {el.name}
                </span>
                {el.date && (
                  <span className="text-[10px] text-muted-foreground font-mono mt-0.5">
                    {formatBrDate(el.date)}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-4">
                <span
                  className="font-mono border font-bold text-foreground bg-muted/60 px-2 py-0.5 rounded text-xs"
                  style={{
                    backgroundColor: `var(--monitoring-${el.level === 0 ? 'ok' : el.level === 1 ? 'warning' : 'error'})`
                  }}
                >
                  {el.value}
                </span>
                <span
                  className={`h-3 w-3 rounded-full shrink-0 ${getLevelColor(
                    el.level,
                    true,
                    false
                  )}`}
                  title={getLevelText(el.level, true, false)}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
