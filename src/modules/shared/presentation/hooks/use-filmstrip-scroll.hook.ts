import { useEffect } from 'react'

/**
 * Rola automaticamente o carrossel de fotos (filmstrip) para centralizar a miniatura
 * correspondente ao `activeFrameNumber` fornecido sempre que ele for alterado.
 *
 * As miniaturas devem possuir `id="frame-thumb-{frameNumber}"`.
 */
export function useFilmstripScroll(activeFrameNumber: number | undefined) {
  useEffect(() => {
    if (activeFrameNumber === undefined) return
    const el = document.getElementById(`frame-thumb-${activeFrameNumber}`)
    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      })
    }
  }, [activeFrameNumber])
}
