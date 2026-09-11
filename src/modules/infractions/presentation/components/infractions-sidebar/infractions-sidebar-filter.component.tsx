'use client'

import { useMemo } from 'react'
import { Search, X, AlertTriangle, ShieldAlert } from 'lucide-react'
import { MultiSelect } from '@/modules/shared/presentation/components/multi-select/multi-select.component'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { Input } from '@/modules/shared/presentation/components/shadcn/input'

interface InfractionsSidebarFilterProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedOptions: Set<string>
  onToggleOption: (optionKey: string) => void
  onSetCategoryOptions: (prefix: string, newIds: (string | number)[]) => void
  onClear: () => void
  availableLanes?: Array<string | number>
  availableViolations?: Array<{ id: string | number; label: string }>
  availableRestrictions?: Array<{ id: string | number; label: string }>
  hasUnread?: boolean
  unreadCount?: number
}

export function InfractionsSidebarFilter({
  searchQuery,
  onSearchChange,
  selectedOptions,
  onToggleOption,
  onSetCategoryOptions,
  onClear,
  availableLanes = [],
  availableViolations = [],
  availableRestrictions = [],
  hasUnread = false,
  unreadCount
}: InfractionsSidebarFilterProps) {

  // 2. Items & Values for Violations MultiSelect
  const violationsItems = useMemo(() => {
    return availableViolations.map((v) => ({
      id: v.id,
      label: v.label
    }))
  }, [availableViolations])

  const selectedViolationIds = useMemo(() => {
    return Array.from(selectedOptions)
      .filter((opt) => opt.startsWith('violation_'))
      .map((opt) => {
        const val = opt.replace('violation_', '')
        return isNaN(Number(val)) ? val : Number(val)
      })
  }, [selectedOptions])

  // 3. Items & Values for Restrictions MultiSelect
  const restrictionsItems = useMemo(() => {
    return availableRestrictions.map((r) => ({
      id: r.id,
      label: r.label
    }))
  }, [availableRestrictions])

  const selectedRestrictionIds = useMemo(() => {
    return Array.from(selectedOptions)
      .filter((opt) => opt.startsWith('restriction_'))
      .map((opt) => {
        const val = opt.replace('restriction_', '')
        return isNaN(Number(val)) ? val : Number(val)
      })
  }, [selectedOptions])

  const activeCount = selectedOptions.size + (searchQuery ? 1 : 0)

  return (
    <div className="px-3 py-2.5 border-b shrink-0 flex flex-col gap-2 bg-card/60">
      {/* Search Input */}
      <div className="relative flex items-center w-full">
        <Search className="w-3.5 h-3.5 absolute left-2.5 text-muted-foreground pointer-events-none" />
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Pesquisar registros..."
          className="w-full h-8 pl-8 pr-8 text-[11px] placeholder:text-[11px] bg-background/50 border-border/70 shadow-none focus-visible:ring-primary-500"
        />
        {searchQuery && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onSearchChange('')}
            className="absolute right-1 h-6 w-6 text-muted-foreground hover:text-foreground"
          >
            <X className="w-3.5 h-3.5" />
          </Button>
        )}
      </div>

      {/* MultiSelect Controls in a 2-column grid */}
      <div className="grid grid-cols-2 gap-1.5">
        {/* Violations MultiSelect */}
        <MultiSelect
          items={violationsItems}
          value={selectedViolationIds}
          onChange={(ids) => onSetCategoryOptions('violation_', ids)}
          leftIcon={AlertTriangle}
          placeholder="Violações"
          notFoundItemPlaceholder="Nenhuma violação"
          className="h-8 text-xs w-full"
          popoverWidth={240}
        />

        {/* Restrictions MultiSelect */}
        <MultiSelect
          items={restrictionsItems}
          value={selectedRestrictionIds}
          onChange={(ids) => onSetCategoryOptions('restriction_', ids)}
          leftIcon={ShieldAlert}
          placeholder="Restrições"
          notFoundItemPlaceholder="Nenhuma restrição"
          className="h-8 text-xs w-full"
          popoverWidth={240}
        />
      </div>

      {/* Dedicated Row below grid for Badges & Actions */}
      {(hasUnread || activeCount > 0) && (
        <div className="flex items-center justify-between gap-1.5 pt-0.5 w-full">
          {hasUnread && (
            <button
              type="button"
              onClick={() => onToggleOption('new')}
              className={`h-6 px-2.5 rounded-full text-[10px] font-semibold inline-flex items-center gap-1.5 transition-all cursor-pointer select-none border ${
                selectedOptions.has('new')
                  ? 'bg-primary-500 text-white border-primary-500 shadow-xs'
                  : 'bg-background text-muted-foreground border-border/80 hover:bg-accent hover:text-foreground'
              }`}
            >
              <span>Novos</span>
              {unreadCount && unreadCount > 0 ? (
                <span
                  className={`inline-flex items-center justify-center px-1 rounded-full text-[9px] font-bold leading-none ${
                    selectedOptions.has('new')
                      ? 'bg-white/25 text-white'
                      : 'bg-primary-500/15 text-primary-500 border border-primary-500/20'
                  }`}
                >
                  {unreadCount}
                </span>
              ) : (
                <span
                  className={`h-1.5 w-1.5 rounded-full animate-pulse ${
                    selectedOptions.has('new') ? 'bg-white' : 'bg-primary-500'
                  }`}
                />
              )}
            </button>
          )}

          {activeCount > 0 && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onClear}
              className="h-6 px-1.5 text-[10px] font-semibold text-muted-foreground hover:text-destructive shrink-0 ml-auto"
              title="Limpar todos os filtros"
            >
              Limpar ({activeCount})
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
