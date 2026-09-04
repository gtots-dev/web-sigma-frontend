import React from 'react'
import { Download, Video, Upload } from 'lucide-react'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'

interface VideoPlayerActionsProps {
  isFullyReady: boolean
  isInspecting: boolean
  onDownload: () => void
  onReturnToVideo: () => void
  onTriggerUpload: () => void
}

export function VideoPlayerActionsComponent({
  isFullyReady,
  isInspecting,
  onDownload,
  onReturnToVideo,
  onTriggerUpload,
}: VideoPlayerActionsProps) {
  return (
    <div className="flex items-center gap-2">
      {isFullyReady && isInspecting && (
        <>
          <Button
            size="sm"
            variant="outline"
            className="h-7 text-xs backdrop-blur-sm bg-background/80"
            onClick={onDownload}
          >
            <Download className="w-3 h-3" />
            Baixar JPG
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-7 text-xs backdrop-blur-sm bg-background/80"
            onClick={onReturnToVideo}
          >
            <Video className="w-3 h-3" />
            Voltar ao Vídeo
          </Button>
        </>
      )}

      <Button
        size="sm"
        variant="outline"
        className="h-7 text-xs backdrop-blur-sm bg-background/80 pointer-events-auto"
        onClick={onTriggerUpload}
      >
        <Upload className="w-3 h-3" />
        Carregar Vídeo
      </Button>
    </div>
  )
}
