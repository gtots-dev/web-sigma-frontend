'use client'

import { useEffect, useRef } from 'react'

interface BidirectionalScrollOptions {
  onNearTop: () => void
  onNearBottom: () => void
  hasMore: { top: boolean; bottom: boolean }
  loading: { top: boolean; bottom: boolean }
  sentinelTopId?: string
  sentinelBottomId?: string
  prefetchMarginPx?: number
  nudgeOnTop?: boolean
  nudgeMultiplier?: number
  cooldownMs?: number
}

function resolveScrollContainer(el: HTMLElement | null): HTMLElement | null {
  let node = el?.parentElement ?? null
  while (node) {
    const { overflow, overflowY } = getComputedStyle(node)
    if (/auto|scroll/.test(overflow + overflowY)) return node
    node = node.parentElement
  }
  return null
}

export function useBidirectionalScroll({
  onNearTop,
  onNearBottom,
  hasMore,
  loading,
  sentinelTopId = 'sentinel-top',
  sentinelBottomId = 'sentinel-bottom',
  cooldownMs = 500
}: BidirectionalScrollOptions) {
  const onNearTopRef = useRef(onNearTop)
  const onNearBottomRef = useRef(onNearBottom)
  const hasMoreRef = useRef(hasMore)
  const loadingRef = useRef(loading)
  const inFlightBottom = useRef(false)
  const inFlightTop = useRef(false)

  // Referência para ancorar o card visível atual e seu deslocamento (offset) em relação à tela
  const anchorCardRef = useRef<{
    element: HTMLElement
    offsetFromTop: number
  } | null>(null)
  const prevScrollHeightRef = useRef<number | null>(null)
  const prevScrollTopRef = useRef<number | null>(null)

  useEffect(() => {
    onNearTopRef.current = onNearTop
  }, [onNearTop])
  useEffect(() => {
    onNearBottomRef.current = onNearBottom
  }, [onNearBottom])
  useEffect(() => {
    hasMoreRef.current = hasMore
  }, [hasMore])
  useEffect(() => {
    loadingRef.current = loading
  }, [loading])

  // Captura o primeiro card/imagem visível na área de rolagem do usuário para usar como âncora
  const captureVisibleAnchorCard = (container: HTMLElement | null) => {
    if (!container) return
    const cards = Array.from(
      container.querySelectorAll<HTMLElement>('[data-infraction-card]')
    )
    const containerRect = container.getBoundingClientRect()

    for (const card of cards) {
      const cardRect = card.getBoundingClientRect()
      // Identifica o primeiro card visível dentro do limite do container
      if (
        cardRect.bottom >= containerRect.top &&
        cardRect.top <= containerRect.bottom
      ) {
        anchorCardRef.current = {
          element: card,
          offsetFromTop: cardRect.top - containerRect.top
        }
        break
      }
    }
  }

  const isAtBottom = (container: HTMLElement | Window): boolean => {
    if (container instanceof HTMLElement) {
      return (
        container.scrollHeight - container.scrollTop - container.clientHeight <= 3
      )
    }
    const scrollHeight = document.documentElement.scrollHeight
    const clientHeight = window.innerHeight
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    return scrollHeight - scrollTop - clientHeight <= 3
  }

  const isAtTop = (container: HTMLElement | Window): boolean => {
    if (container instanceof HTMLElement) {
      return container.scrollTop <= 3
    }
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    return scrollTop <= 3
  }

  const tryTriggerBottom = (container: HTMLElement | Window | null) => {
    if (
      !inFlightBottom.current &&
      hasMoreRef.current.bottom &&
      !loadingRef.current.bottom
    ) {
      const el =
        container instanceof HTMLElement
          ? container
          : resolveScrollContainer(document.getElementById(sentinelBottomId))

      if (el) {
        captureVisibleAnchorCard(el)
      }

      inFlightBottom.current = true
      onNearBottomRef.current()
    }
  }

  const tryTriggerTop = (container: HTMLElement | Window | null) => {
    if (
      !inFlightTop.current &&
      hasMoreRef.current.top &&
      !loadingRef.current.top
    ) {
      const el =
        container instanceof HTMLElement
          ? container
          : resolveScrollContainer(document.getElementById(sentinelTopId))

      if (el) {
        captureVisibleAnchorCard(el)
        if (el.scrollHeight > el.clientHeight) {
          prevScrollHeightRef.current = el.scrollHeight
          prevScrollTopRef.current = el.scrollTop
        }
      } else {
        prevScrollHeightRef.current = document.documentElement.scrollHeight
        prevScrollTopRef.current =
          window.scrollY || document.documentElement.scrollTop
      }

      inFlightTop.current = true
      onNearTopRef.current()
    }
  }

  // Restaura a posição de rolagem travando o elemento ancorado exatamente no mesmo deslocamento
  useEffect(() => {
    if (!loading.bottom) {
      if (
        anchorCardRef.current?.element &&
        anchorCardRef.current.element.isConnected
      ) {
        const { element, offsetFromTop } = anchorCardRef.current
        const sentinelBottom = document.getElementById(sentinelBottomId)
        const container = resolveScrollContainer(sentinelBottom)

        requestAnimationFrame(() => {
          if (container && element.isConnected) {
            const containerTop = container.getBoundingClientRect().top
            const currentCardTop = element.getBoundingClientRect().top
            const diff = currentCardTop - containerTop - offsetFromTop
            if (diff !== 0) {
              container.scrollTop += diff
            }
          }
          anchorCardRef.current = null
        })
      }

      const timer = setTimeout(() => {
        inFlightBottom.current = false
      }, cooldownMs)
      return () => clearTimeout(timer)
    }
  }, [loading.bottom, cooldownMs, sentinelBottomId])

  useEffect(() => {
    if (!loading.top) {
      if (
        anchorCardRef.current?.element &&
        anchorCardRef.current.element.isConnected
      ) {
        const { element, offsetFromTop } = anchorCardRef.current
        const sentinelTop = document.getElementById(sentinelTopId)
        const container = resolveScrollContainer(sentinelTop)

        requestAnimationFrame(() => {
          if (container && element.isConnected) {
            const containerTop = container.getBoundingClientRect().top
            const currentCardTop = element.getBoundingClientRect().top
            const diff = currentCardTop - containerTop - offsetFromTop
            if (diff !== 0) {
              container.scrollTop += diff
            }
          } else if (
            prevScrollHeightRef.current !== null &&
            prevScrollTopRef.current !== null
          ) {
            const currentHeight = document.documentElement.scrollHeight
            const diff = currentHeight - prevScrollHeightRef.current!
            if (diff > 0) {
              window.scrollTo({
                top: prevScrollTopRef.current! + diff,
                behavior: 'instant' as ScrollBehavior
              })
            }
          }
          anchorCardRef.current = null
          prevScrollHeightRef.current = null
          prevScrollTopRef.current = null
        })
      }

      const timer = setTimeout(() => {
        inFlightTop.current = false
      }, cooldownMs)
      return () => clearTimeout(timer)
    }
  }, [loading.top, cooldownMs, sentinelTopId])

  // Captura os eventos de rolagem extra (wheel, touch, keydown) apenas quando o container estiver na borda (zona segura)
  useEffect(() => {
    const sentinelBottom = document.getElementById(sentinelBottomId)
    const container = resolveScrollContainer(sentinelBottom)
    const target = container ?? window

    let touchStartY = 0

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0 && isAtBottom(target)) {
        tryTriggerBottom(target)
      } else if (e.deltaY < 0 && isAtTop(target)) {
        tryTriggerTop(target)
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartY = e.touches[0].clientY
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return
      const currentY = e.touches[0].clientY
      const diffY = touchStartY - currentY // positivo: arrastando para cima (tentativa de rolar para baixo)

      if (diffY > 15 && isAtBottom(target)) {
        tryTriggerBottom(target)
      } else if (diffY < -15 && isAtTop(target)) {
        tryTriggerTop(target)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      const isDownKey = e.key === 'ArrowDown' || e.key === 'PageDown'
      const isUpKey = e.key === 'ArrowUp' || e.key === 'PageUp'

      if (isDownKey && isAtBottom(target)) {
        tryTriggerBottom(target)
      } else if (isUpKey && isAtTop(target)) {
        tryTriggerTop(target)
      }
    }

    target.addEventListener('wheel', handleWheel as EventListener, { passive: true })
    target.addEventListener('touchstart', handleTouchStart as EventListener, { passive: true })
    target.addEventListener('touchmove', handleTouchMove as EventListener, { passive: true })
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      target.removeEventListener('wheel', handleWheel as EventListener)
      target.removeEventListener('touchstart', handleTouchStart as EventListener)
      target.removeEventListener('touchmove', handleTouchMove as EventListener)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [sentinelBottomId, sentinelTopId, cooldownMs])
}

