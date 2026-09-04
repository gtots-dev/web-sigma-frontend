'use client'

import React, { useState, useRef } from 'react'
import { Upload, Download, Link, X, Check } from 'lucide-react'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'

interface VideoPlayerMetadataProps {
  isFullyReady: boolean
  hasActiveFrame: boolean
  onDownload?: () => void
  onTriggerUpload?: () => void
  onLoadUrl?: (url: string) => void
  activeFrameNumber?: number
  totalFrames?: number
  currentTime?: number
  duration?: number
}

export function VideoPlayerMetadataComponent({
  isFullyReady,
  hasActiveFrame,
  onDownload,
  onTriggerUpload,
  onLoadUrl,
}: VideoPlayerMetadataProps) {
  const [showUrlInput, setShowUrlInput] = useState(false)
  const [urlValue, setUrlValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleToggleUrl = () => {
    setShowUrlInput((prev) => {
      if (!prev) setTimeout(() => inputRef.current?.focus(), 50)
      return !prev
    })
    setUrlValue('')
  }

  const handleConfirm = () => {
    if (urlValue.trim()) {
      onLoadUrl?.(urlValue.trim())
      setUrlValue('')
      setShowUrlInput(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleConfirm()
    if (e.key === 'Escape') setShowUrlInput(false)
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        variant="outline"
        className="h-7 text-xs pointer-events-auto shrink-0"
        disabled={!isFullyReady || !hasActiveFrame}
        onClick={onDownload}
      >
        <Download className="w-3 h-3" />
        Baixar Captura
      </Button>

      {/* URL input expandível */}
      {onLoadUrl && (
        <div className="flex items-center gap-1.5 transition-all duration-200">
          {showUrlInput && (
            <div className="flex items-center gap-1 animate-in fade-in slide-in-from-right-2 duration-200">
              <input
                ref={inputRef}
                type="url"
                value={urlValue}
                onChange={(e) => setUrlValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="https://... ou http://localhost:8000/..."
                className="h-7 w-72 rounded-md border border-border/70 bg-background px-2.5 text-xs font-mono text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-all"
              />
              <Button
                size="icon"
                variant="default"
                className="h-7 w-7 shrink-0 cursor-pointer"
                style={{ background: 'var(--primary-600)' }}
                onClick={handleConfirm}
                disabled={!urlValue.trim()}
                title="Carregar URL"
              >
                <Check className="w-3.5 h-3.5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7 shrink-0 cursor-pointer"
                onClick={() => setShowUrlInput(false)}
                title="Cancelar"
              >
                <X className="w-3.5 h-3.5" />
              </Button>
            </div>
          )}

          <Button
            size="sm"
            variant={showUrlInput ? 'default' : 'outline'}
            className="h-7 text-xs pointer-events-auto shrink-0"
            style={showUrlInput ? { background: 'var(--primary-600)' } : undefined}
            onClick={handleToggleUrl}
            title="Carregar vídeo por URL"
          >
            <Link className="w-3 h-3" />
            {showUrlInput ? 'Cancelar URL' : 'Carregar URL'}
          </Button>
        </div>
      )}

      {onTriggerUpload && (
        <Button
          size="sm"
          variant="outline"
          className="h-7 text-xs pointer-events-auto shrink-0"
          onClick={onTriggerUpload}
        >
          <Upload className="w-3 h-3" />
          Carregar Arquivo
        </Button>
      )}
    </div>
  )
}
