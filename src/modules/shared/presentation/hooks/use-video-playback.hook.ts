import { useState, useCallback, useRef, useEffect } from 'react'

interface VideoMetadata {
  duration: number
  width: number
  height: number
}

interface UseVideoPlaybackReturn {
  isPlaying: boolean
  /** Verdadeiro assim que os metadados do vídeo são carregados — NÃO requer a conclusão da extração de quadros. */
  isVideoReady: boolean
  currentTime: number
  metadata: VideoMetadata
  setCurrentTime: (t: number) => void
  /** @deprecated Não é mais necessário — o loop RAF manipula atualizações de currentTime automaticamente. Mantido para compatibilidade de API. */
  handleTimeUpdate: (videoEl: HTMLVideoElement) => void
  handleLoadedMetadata: (videoEl: HTMLVideoElement) => void
  togglePlay: (videoEl: HTMLVideoElement, isReady: boolean, onSwitchToVideo: () => void) => void
  startRafLoop: (videoEl: HTMLVideoElement) => void
  stopRafLoop: () => void
  onEnded: () => void
}

/**
 * Gerencia o estado de reprodução de vídeo nativo HTML5: reproduzir/pausar, currentTime e metadados.
 *
 * Utiliza um loop requestAnimationFrame (~60fps) para atualizar currentTime durante a reprodução,
 * em vez do evento nativo `timeupdate`, que dispara apenas ~4x por segundo e faz com que
 * o indicador do slider da linha do tempo "pule" visualmente em vez de se mover suavemente.
 *
 * NÃO possui a lógica de seek da linha do tempo ou navegação de quadros —
 * essas responsabilidades pertencem ao `use-frame-navigation.hook.ts`.
 */
export function useVideoPlayback(): UseVideoPlaybackReturn {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [metadata, setMetadata] = useState<VideoMetadata>({ duration: 0, width: 0, height: 0 })

  // Referência para o ID de quadro da animação RAF para podermos cancelá-lo ao pausar/desmontar
  const rafIdRef = useRef<number | null>(null)
  // Referência para o elemento de vídeo monitorado pelo loop RAF
  const videoElRef = useRef<HTMLVideoElement | null>(null)

  /** Inicia um loop RAF de 60fps que lê videoEl.currentTime a cada quadro. */
  const startRafLoop = useCallback((videoEl: HTMLVideoElement) => {
    videoElRef.current = videoEl

    // Cancela qualquer loop em execução anterior antes de iniciar um novo
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current)
    }

    const tick = () => {
      if (!videoElRef.current || videoElRef.current.paused || videoElRef.current.ended) {
        rafIdRef.current = null
        return
      }
      setCurrentTime(videoElRef.current.currentTime)
      rafIdRef.current = requestAnimationFrame(tick)
    }

    rafIdRef.current = requestAnimationFrame(tick)
  }, [])

  /** Para o loop RAF (chamado ao pausar, terminar o seek ou desmontar). */
  const stopRafLoop = useCallback(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = null
    }
  }, [])

  // Limpeza ao desmontar
  useEffect(() => {
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [])

  /**
   * @deprecated O loop RAF manipula atualizações de currentTime automaticamente.
   * Mantido para compatibilidade retroativa — os chamadores podem parar de usá-lo com segurança.
   */
  const handleTimeUpdate = useCallback((_videoEl: HTMLVideoElement) => {
    // No-op: O loop RAF agora gerencia as atualizações de currentTime durante a reprodução.
  }, [])

  const handleLoadedMetadata = useCallback((videoEl: HTMLVideoElement) => {
    setMetadata({
      duration: videoEl.duration || 0,
      width: videoEl.videoWidth,
      height: videoEl.videoHeight,
    })
    setCurrentTime(videoEl.currentTime)
    setIsVideoReady(true)
  }, [])

  const togglePlay = useCallback(
    (videoEl: HTMLVideoElement, isReady: boolean, onSwitchToVideo: () => void) => {
      if (!isReady) return
      onSwitchToVideo()

      if (videoEl.paused) {
        videoEl.play().then(() => {
          setIsPlaying(true)
          startRafLoop(videoEl)
        }).catch(console.error)
      } else {
        videoEl.pause()
        stopRafLoop()
        // Sincroniza o currentTime final após pausar para que o slider não retorne abruptamente
        setCurrentTime(videoEl.currentTime)
        setIsPlaying(false)
      }
    },
    [startRafLoop, stopRafLoop]
  )

  const onEnded = useCallback(() => {
    stopRafLoop()
    setIsPlaying(false)
  }, [stopRafLoop])

  return {
    isPlaying,
    isVideoReady,
    currentTime,
    metadata,
    setCurrentTime,
    handleTimeUpdate,
    handleLoadedMetadata,
    togglePlay,
    startRafLoop,
    stopRafLoop,
    onEnded,
  }
}
