import React, { ReactNode, RefObject } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'

interface FrameSequenceFilmstripProps {
  filmstripRef: RefObject<HTMLDivElement | null>
  children: ReactNode
  onStepLeft?: () => void
  onStepRight?: () => void
}

export function FrameSequenceFilmstripComponent({
  filmstripRef,
  children,
  onStepLeft,
  onStepRight,
}: FrameSequenceFilmstripProps) {
  const handleScrollLeft = () => {
    if (filmstripRef.current) {
      filmstripRef.current.scrollBy({ left: -260, behavior: 'smooth' })
    }
    if (onStepLeft) onStepLeft()
  }

  const handleScrollRight = () => {
    if (filmstripRef.current) {
      filmstripRef.current.scrollBy({ left: 260, behavior: 'smooth' })
    }
    if (onStepRight) onStepRight()
  }

  return (
    <div className="relative flex items-center gap-3 group">
      {/* Left Navigation Arrow */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={handleScrollLeft}
        title="Voltar imagem (Seta Esquerda)"
        className="h-14 w-8 shrink-0 rounded-md border bg-background/80 hover:bg-muted shadow-sm backdrop-blur-sm z-10 p-0 text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {/* Filmstrip Thumbnails Container */}
      <div
        ref={filmstripRef}
        className="flex-1 flex gap-2 overflow-x-auto py-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden scroll-smooth px-3"
      >
        {children}
      </div>

      {/* Right Navigation Arrow */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={handleScrollRight}
        title="Avançar imagem (Seta Direita)"
        className="h-14 w-8 shrink-0 rounded-md border bg-background/80 hover:bg-muted shadow-sm backdrop-blur-sm z-10 p-0 text-muted-foreground hover:text-foreground"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  )
}
