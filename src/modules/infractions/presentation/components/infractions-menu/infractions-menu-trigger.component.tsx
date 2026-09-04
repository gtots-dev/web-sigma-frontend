'use client'

import { useState, useEffect, type ReactNode } from 'react'
import { Loader2 } from 'lucide-react'
import type { Infraction } from '@/modules/infractions/domain/interfaces/infraction.interface'
import { useInfractionsMenuTrigger } from '../../hooks/use-infractions-menu-trigger.hook'
import { useInfractionGrid } from '../infractions-grid'
import { useInfractionsMenuContext } from '../../contexts/infractions-menu.context'

interface InfractionsMenuTriggerProps {
  infraction?: Infraction
  children: ReactNode
  className?: string
}

export function InfractionsMenuTriggerComponent({
  infraction: propInfraction,
  children,
  className = 'cursor-pointer'
}: InfractionsMenuTriggerProps) {
  const [loading, setLoading] = useState(false)
  const { loadInfractionOpenDialog } = useInfractionsMenuTrigger()
  const { isOpen, selectedInfraction } = useInfractionsMenuContext()
  const contextInfraction = useInfractionGrid()
  const infraction = propInfraction ?? contextInfraction

  useEffect(() => {
    if (isOpen && selectedInfraction?.id === infraction?.id) {
      setLoading(false)
    }
  }, [isOpen, selectedInfraction, infraction?.id])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (loading) {
      timer = setTimeout(() => {
        setLoading(false)
      }, 4000)
    }
    return () => clearTimeout(timer)
  }, [loading])

  const handleClick = () => {
    if (!infraction || loading) return
    setLoading(true)
    loadInfractionOpenDialog(infraction)
  }

  return (
    <div onClick={handleClick} className={`relative flex flex-col w-full h-full ${className}`}>
      {children}
      {loading && (
        <div className="absolute inset-0 bg-background/70 backdrop-blur-[3px] flex flex-col items-center justify-center gap-1.5 rounded-lg z-20 transition-all duration-300 animate-in fade-in">
          <Loader2 className="w-7 h-7 animate-spin text-primary" />
          <span className="text-[10px] font-medium font-mono text-muted-foreground uppercase tracking-wider">
            Carregando...
          </span>
        </div>
      )}
    </div>
  )
}
