import { ArrowUpRight } from 'lucide-react'
import { getLastUpdateText, getLevelColor } from '../../../utils/monitoring-menu-details.utils'
import type { LaneInfo, UpInfo } from '../../../hooks/use-monitoring-menu-details.hook'

interface MonitoringMenuDetailsItemProps {
  data: UpInfo | LaneInfo
  isAccessing: boolean
  onAccess: () => void
  isNested?: boolean
}

export function MonitoringMenuDetailsItem({ 
  data, 
  isAccessing, 
  onAccess,
  isNested = false
}: MonitoringMenuDetailsItemProps) {
  const isUp = 'offline' in data
  const offline = isUp ? (data as UpInfo).offline : false
  const isOffline = !data.hasData || offline

  return (
    <div
      onClick={onAccess}
      className={`flex items-center justify-between w-full transition-all duration-200 cursor-pointer group select-none relative ${
        isOffline ? 'opacity-80 hover:opacity-100' : ''
      } ${
        isNested 
          ? 'py-1.5 px-3 border border-border/30 rounded bg-background/50 dark:bg-zinc-900/30 hover:border-primary-300 dark:hover:border-primary-700 hover:bg-background dark:hover:bg-zinc-900/50 text-[11px]' 
          : 'py-2 px-3 border border-border/40 rounded-md bg-background dark:bg-zinc-900/80 hover:border-primary-300 dark:hover:border-primary-700 hover:bg-zinc-50 dark:hover:bg-zinc-900 font-semibold text-xs'
      }`}
    >
      {isNested && (
        <div className="absolute -left-[10px] top-1/2 -translate-y-1/2 w-[10px] h-[1px] bg-border/60 pointer-events-none" />
      )}
      <div className="flex items-center gap-2 min-w-0">
        <span
          className={`rounded-full shrink-0 ${
            isNested ? 'h-2 w-2' : 'h-2.5 w-2.5'
          } ${getLevelColor(
            data.level,
            data.hasData,
            offline
          )}`}
        />
        <div className="flex flex-col min-w-0">
          <span className={`text-foreground truncate max-w-[150px] ${isNested ? 'font-semibold text-muted-foreground group-hover:text-foreground transition-colors' : 'font-bold'}`}>
            {data.name}
          </span>
          <span className="text-[8px] uppercase tracking-wider font-semibold text-muted-foreground mt-0.5">
            {getLastUpdateText(data.hasData, data.items)}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0">
        {isAccessing ? (
          <span className="h-3 w-3 border border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <ArrowUpRight 
            size={isNested ? 12 : 14} 
            className="stroke-[2.5] opacity-40 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-x-[1px] group-hover:-translate-y-[1px]" 
          />
        )}
      </div>
    </div>
  )
}
