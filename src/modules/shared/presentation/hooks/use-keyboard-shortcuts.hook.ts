import { useEffect } from 'react'

interface UseKeyboardShortcutsOptions {
  isReady: boolean
  onPlay: () => void
  onStepBack: (shift: boolean) => void
  onStepForward: (shift: boolean) => void
}

/**
 * Registra atalhos de teclado globais para o reprodutor de vídeo:
 *
 * - `Space`            → alternar reprodução/pausa
 * - `ArrowLeft`        → voltar 1 quadro
 * - `Shift+ArrowLeft`  → voltar 10 quadros
 * - `ArrowRight`       → avançar 1 quadro
 * - `Shift+ArrowRight` → avançar 10 quadros
 *
 * Ignora eventos originados de elementos de formulário (INPUT, SELECT, TEXTAREA).
 */
export function useKeyboardShortcuts({
  isReady,
  onPlay,
  onStepBack,
  onStepForward,
}: UseKeyboardShortcutsOptions) {
  useEffect(() => {
    const FORM_TAGS = ['INPUT', 'SELECT', 'TEXTAREA']

    const handleKeyDown = (e: KeyboardEvent) => {
      if (FORM_TAGS.includes((e.target as HTMLElement)?.tagName)) return
      if (!isReady) return

      if (e.code === 'Space') {
        e.preventDefault()
        onPlay()
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault()
        onStepBack(e.shiftKey)
      } else if (e.code === 'ArrowRight') {
        e.preventDefault()
        onStepForward(e.shiftKey)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isReady, onPlay, onStepBack, onStepForward])
}
