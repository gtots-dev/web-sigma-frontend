'use client'

import { ReactNode } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { useMonitoringControlsRoot } from '../../hooks/use-monitoring-controls-root.hook'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/modules/shared/presentation/components/shadcn/tooltip'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger
} from '@/modules/shared/presentation/components/shadcn/drawer'

interface MonitoringControlsRootProps {
  children?: ReactNode
}

export function MonitoringControlsRoot({
  children
}: MonitoringControlsRootProps) {
  const {
    isMobileDrawerOpen,
    setIsMobileDrawerOpen,
    isControlsMinimized,
    setIsControlsMinimized,
    stopPropagation
  } = useMonitoringControlsRoot()

  return (
    <TooltipProvider delayDuration={150}>
      {/* -------------------- MOBILE LAYOUT (Bottom Drawer) -------------------- */}
      <div className="sm:hidden">
        <Drawer
          open={isMobileDrawerOpen}
          onOpenChange={setIsMobileDrawerOpen}
          dismissible={true}
        >
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              onClick={(e) => {
                e.stopPropagation()
                setIsMobileDrawerOpen(true)
              }}
              className="absolute bottom-3 left-1/2 -translate-x-1/2 z-40 h-16 w-16 rounded-full bg-card/95 border !p-0 border-border/80 transition-all duration-200 cursor-pointer"
            >
              <SlidersHorizontal className="text-primary-600 shrink-0 !size-5" />
            </Button>
          </DrawerTrigger>

          <DrawerContent
            className="p-4 sm:hidden z-[200]"
            overlayClassName="bg-black/20 backdrop-blur-[1px]"
            onOverlayClick={() => setIsMobileDrawerOpen(false)}
          >
            <DrawerHeader className="px-0 pt-2 pb-3 text-left">
              <DrawerTitle className="text-base font-bold flex items-center gap-2">
                Controles de Monitoramento
              </DrawerTitle>
              <DrawerDescription className="text-xs">
                Ajuste os modos de visualização, nível de zoom e exibições.
                Toque fora para fechar.
              </DrawerDescription>
            </DrawerHeader>

            <div className="flex flex-col gap-3 py-2 max-h-[75vh] overflow-y-auto">
              <div className="flex flex-wrap items-center justify-center gap-2.5 bg-muted/20 p-3 rounded-2xl border border-border/60">
                {children}
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      {/* -------------------- DESKTOP LAYOUT (Floating Toolbar) -------------------- */}
      {isControlsMinimized ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsControlsMinimized(false)}
              onPointerDown={stopPropagation}
              onMouseDown={stopPropagation}
              className="hidden sm:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-40 h-10 w-10 rounded-xl bg-background/90 backdrop-blur-md border border-border shadow-xl hover:bg-accent transition-all duration-300 animate-in fade-in zoom-in-95 cursor-pointer"
            >
              <SlidersHorizontal size={18} className="text-foreground" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top" className="text-xs font-medium">
            Expandir Controles de Monitoramento
          </TooltipContent>
        </Tooltip>
      ) : (
        <div
          onPointerDown={stopPropagation}
          onMouseDown={stopPropagation}
          className="hidden sm:flex absolute bottom-3 left-1/2 -translate-x-1/2 z-40 items-center gap-2 md:gap-3 bg-card/95 backdrop-blur-md border border-border/80 p-2 md:p-2.5 rounded-2xl shadow-xl max-w-[calc(100%-2rem)] overflow-x-auto [::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] whitespace-nowrap"
        >
          {children}
        </div>
      )}
    </TooltipProvider>
  )
}
