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
  sentinelTopId    = 'sentinel-top',
  sentinelBottomId = 'sentinel-bottom',
  prefetchMarginPx,
  nudgeOnTop    = false,
  nudgeMultiplier = 1.5,
  cooldownMs    = 500,
}: BidirectionalScrollOptions) {
  const bottomObs = useRef<IntersectionObserver | null>(null)
  const topObs    = useRef<IntersectionObserver | null>(null)

  const onNearTopRef    = useRef(onNearTop)
  const onNearBottomRef = useRef(onNearBottom)
  const hasMoreRef      = useRef(hasMore)
  const loadingRef      = useRef(loading)
  const inFlightBottom  = useRef(false)
  const inFlightTop     = useRef(false)

  const isBottomIntersecting = useRef(false)
  const isTopIntersecting    = useRef(false)

  const isScrollingDownRef   = useRef(false)
  const isScrollingUpRef     = useRef(false)
  const lastScrollTopRef     = useRef(0)
  const scrollStopTimerRef   = useRef<NodeJS.Timeout | null>(null)

  // Referência para ancorar o último card visível antes do fetch inferior (ex: card #98501)
  const lastCardRef            = useRef<HTMLElement | null>(null)
  const prevScrollHeightRef    = useRef<number | null>(null)
  const prevScrollTopRef       = useRef<number | null>(null)

  useEffect(() => { onNearTopRef.current    = onNearTop    }, [onNearTop])
  useEffect(() => { onNearBottomRef.current = onNearBottom }, [onNearBottom])
  useEffect(() => { hasMoreRef.current      = hasMore      }, [hasMore])
  useEffect(() => { loadingRef.current      = loading      }, [loading])

  const tryTriggerBottom = () => {
    // Requisita APENAS se o usuário estiver ativamente realizando a ação de scroll para baixo
    if (!isScrollingDownRef.current) return

    if (
      isBottomIntersecting.current &&
      !inFlightBottom.current &&
      hasMoreRef.current.bottom &&
      !loadingRef.current.bottom
    ) {
      const sentinelBottom = document.getElementById(sentinelBottomId)
      const container = resolveScrollContainer(sentinelBottom)

      if (container) {
        // Encontra o último card renderizado (ex: #98501) antes de carregar o novo lote
        const cards = container.querySelectorAll('[data-infraction-card]')
        if (cards.length > 0) {
          lastCardRef.current = cards[cards.length - 1] as HTMLElement
        } else {
          const elements = Array.from(container.querySelectorAll('div')).filter(
            (el) =>
              el.id !== sentinelBottomId &&
              el.id !== sentinelTopId &&
              el.offsetHeight > 60
          )
          if (elements.length > 0) {
            lastCardRef.current = elements[elements.length - 1] as HTMLElement
          }
        }
      }

      inFlightBottom.current = true
      onNearBottomRef.current()
    }
  }

  const tryTriggerTop = (container: HTMLElement | null) => {
    // Requisita APENAS se o usuário estiver ativamente realizando a ação de scroll para cima
    if (!isScrollingUpRef.current) return

    if (
      isTopIntersecting.current &&
      !inFlightTop.current &&
      hasMoreRef.current.top &&
      !loadingRef.current.top
    ) {
      // Salva a altura e o scrollTop exatos antes de prependar os novos elementos no topo
      if (container && container.scrollHeight > container.clientHeight) {
        prevScrollHeightRef.current = container.scrollHeight
        prevScrollTopRef.current    = container.scrollTop
      } else {
        prevScrollHeightRef.current = document.documentElement.scrollHeight
        prevScrollTopRef.current    = window.scrollY || document.documentElement.scrollTop
      }

      inFlightTop.current = true
      onNearTopRef.current()
    }
  }

  // Ancoragem perfeita ao carregar no fundo: garante que o último card visto (ex: #98501) continue visível na tela
  useEffect(() => {
    if (!loading.bottom) {
      if (lastCardRef.current) {
        const targetCard = lastCardRef.current
        requestAnimationFrame(() => {
          if (targetCard && targetCard.isConnected) {
            targetCard.scrollIntoView({ block: 'nearest', behavior: 'instant' as ScrollBehavior })
          }
          lastCardRef.current = null
        })
      }

      const timer = setTimeout(() => {
        inFlightBottom.current = false
      }, cooldownMs)
      return () => clearTimeout(timer)
    }
  }, [loading.bottom, cooldownMs])

  // Restauração de rolagem perfeita e imperceptível ao carregar itens no topo
  useEffect(() => {
    if (!loading.top) {
      if (prevScrollHeightRef.current !== null && prevScrollTopRef.current !== null) {
        const sentinelTop = document.getElementById(sentinelTopId)
        const container = resolveScrollContainer(sentinelTop)

        requestAnimationFrame(() => {
          if (container && container.scrollHeight > container.clientHeight) {
            const currentHeight = container.scrollHeight
            const diff = currentHeight - prevScrollHeightRef.current!
            if (diff > 0) {
              container.scrollTop = prevScrollTopRef.current! + diff
            }
          } else {
            const currentHeight = document.documentElement.scrollHeight
            const diff = currentHeight - prevScrollHeightRef.current!
            if (diff > 0) {
              window.scrollTo({ top: prevScrollTopRef.current! + diff, behavior: 'instant' as ScrollBehavior })
            }
          }
          prevScrollHeightRef.current = null
          prevScrollTopRef.current    = null
        })
      }

      const timer = setTimeout(() => {
        inFlightTop.current = false
      }, cooldownMs)
      return () => clearTimeout(timer)
    }
  }, [loading.top, sentinelTopId, cooldownMs])

  // Attach scroll listeners on both container and window to proactively check proximity and direction
  useEffect(() => {
    const sentinelBottom = document.getElementById(sentinelBottomId)
    const container = resolveScrollContainer(sentinelBottom)

    const handleScroll = () => {
      const threshold = prefetchMarginPx ?? 600
      let distanceToBottom = Infinity
      let scrollTop = 0

      if (container && container.scrollHeight > container.clientHeight) {
        distanceToBottom = container.scrollHeight - container.scrollTop - container.clientHeight
        scrollTop = container.scrollTop
      } else {
        const scrollHeight = document.documentElement.scrollHeight
        const clientHeight = window.innerHeight
        scrollTop = window.scrollY || document.documentElement.scrollTop
        distanceToBottom = scrollHeight - scrollTop - clientHeight
      }

      // Detecta direção ativa do movimento de scroll
      const delta = scrollTop - lastScrollTopRef.current
      if (delta > 0.5) {
        isScrollingDownRef.current = true
        isScrollingUpRef.current   = false
      } else if (delta < -0.5) {
        isScrollingDownRef.current = false
        isScrollingUpRef.current   = true
      }
      lastScrollTopRef.current = scrollTop

      // Reseta a intenção após 150ms de inatividade de scroll
      if (scrollStopTimerRef.current) clearTimeout(scrollStopTimerRef.current)
      scrollStopTimerRef.current = setTimeout(() => {
        isScrollingDownRef.current = false
        isScrollingUpRef.current   = false
      }, 150)

      if (distanceToBottom <= threshold) {
        isBottomIntersecting.current = true
        tryTriggerBottom()
      } else {
        isBottomIntersecting.current = false
      }

      if (scrollTop <= threshold) {
        isTopIntersecting.current = true
        tryTriggerTop(container)
      } else {
        isTopIntersecting.current = false
      }
    }

    const target = container ?? window
    target.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      target.removeEventListener('scroll', handleScroll)
      window.removeEventListener('scroll', handleScroll)
      if (scrollStopTimerRef.current) clearTimeout(scrollStopTimerRef.current)
    }
  }, [sentinelBottomId, sentinelTopId, prefetchMarginPx, cooldownMs])

  // Observador do sentinela de baixo
  useEffect(() => {
    const sentinel = document.getElementById(sentinelBottomId)
    if (!sentinel) return

    const container = resolveScrollContainer(sentinel)
    const rootNode = (container && container.scrollHeight > container.clientHeight) ? container : null
    const margin = `${prefetchMarginPx ?? 800}px`

    bottomObs.current?.disconnect()
    bottomObs.current = new IntersectionObserver(([entry]) => {
      isBottomIntersecting.current = entry.isIntersecting
      tryTriggerBottom()
    }, {
      root: rootNode,
      rootMargin: `0px 0px ${margin} 0px`
    })

    bottomObs.current.observe(sentinel)
    return () => bottomObs.current?.disconnect()
  }, [sentinelBottomId, prefetchMarginPx, cooldownMs])

  // Observador do sentinela do topo
  useEffect(() => {
    const sentinel = document.getElementById(sentinelTopId)
    if (!sentinel) return

    const container = resolveScrollContainer(sentinel)
    const rootNode = (container && container.scrollHeight > container.clientHeight) ? container : null
    const margin = `${prefetchMarginPx ?? 800}px`

    topObs.current?.disconnect()
    topObs.current = new IntersectionObserver(([entry]) => {
      isTopIntersecting.current = entry.isIntersecting
      tryTriggerTop(container)
    }, {
      root: rootNode,
      rootMargin: `${margin} 0px 0px 0px`
    })

    topObs.current.observe(sentinel)
    return () => topObs.current?.disconnect()
  }, [sentinelTopId, prefetchMarginPx, nudgeOnTop, nudgeMultiplier, cooldownMs])
}
