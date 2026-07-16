'use client'

import { X, AlertCircle, Search } from 'lucide-react'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { Input } from '@/modules/shared/presentation/components/shadcn/input'
import { MonitoringSidebarFiltersItem } from './monitoring-sidebar-filters-item.component'

interface TelemetryItem {
  name: string
  count: number
  type: 'up' | 'lane'
}

interface MonitoringSidebarFiltersContentProps {
  isSidebarOpen: boolean
  onClose: () => void
  searchQuery: string
  onSearchChange: (value: string) => void
  telemetryItems: TelemetryItem[]
  filteredItems: TelemetryItem[]
  selectedTelemetryFilters: Set<string>
  selectedCount: number
  allVisibleSelected: boolean
  onSelectAllOrClear: () => void
  onToggleFilter: (name: string, type: 'up' | 'lane') => void
}

export function MonitoringSidebarFiltersContent({
  isSidebarOpen,
  onClose,
  searchQuery,
  onSearchChange,
  telemetryItems,
  filteredItems,
  selectedTelemetryFilters,
  selectedCount,
  allVisibleSelected,
  onSelectAllOrClear,
  onToggleFilter
}: MonitoringSidebarFiltersContentProps) {
  return (
    <div
      className={`w-[300px] h-full bg-white dark:bg-zinc-950 flex flex-col overflow-hidden transition-opacity duration-300 ${
        isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between py-3 px-4 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
        <div className="flex-1 pr-2">
          <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
            Filtros de Telemetria
          </h3>
          <p className="text-[11px] text-zinc-500 leading-normal mt-0.5">
            Mostrando alertas e erros ativos nos equipamentos. Selecione-os
            para filtrar ao lado pelos equipamentos e faixas afetados.
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 shrink-0"
          onClick={onClose}
        >
          <X size={16} />
        </Button>
      </div>

      {/* Search Field */}
      <div className="p-3 shrink-0">
        <div className="relative">
          <Search className="absolute -translate-y-2/4  left-3 top-1/2 h-4 w-4 text-zinc-400" />
          <Input
            type="text"
            placeholder="Pesquisar filtros..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 pr-8 h-8 !text-xs"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-2.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Bulk Selection Bar */}
      <div className="flex items-center justify-between px-4 h-10 bg-zinc-50 dark:bg-zinc-900/40 border-t border-b border-zinc-200 dark:border-zinc-800 shrink-0">
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
          {selectedCount} selecionado(s)
        </span>
        {filteredItems.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="underline underline-offset-4 px-2 text-xs h-7"
            onClick={onSelectAllOrClear}
          >
            {allVisibleSelected ? 'Limpar seleção' : 'Selecionar todos'}
          </Button>
        )}
      </div>

      {/* Filters List */}
      <div className="flex-1 overflow-y-auto p-3">
        {telemetryItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <AlertCircle className="h-8 w-8 text-zinc-300 dark:text-zinc-700 mb-2" />
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Nenhuma telemetria disponível
            </p>
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-1">
              Aguardando dados dos equipamentos...
            </p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Nenhum filtro correspondente encontrado
            </p>
          </div>
        ) : (
          <div className="space-y-0.5">
            {filteredItems.map((item) => {
              const key = `${item.type}-${item.name}`
              return (
                <MonitoringSidebarFiltersItem
                  key={key}
                  name={item.name}
                  count={item.count}
                  type={item.type}
                  isSelected={selectedTelemetryFilters.has(key)}
                  onToggle={() => onToggleFilter(item.name, item.type)}
                />
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
