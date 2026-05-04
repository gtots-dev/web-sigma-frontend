'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useRef,
  useEffect
} from 'react'
import { TwoFactorChallengeDialog } from '../components/two-factor-challenge-dialog/two-factor-challenge-dialog.component'

interface TwoFactorChallengeContextData {
  challenge: () => Promise<string | null>
  onComplete: (code: string | null) => void
  isOpen: boolean
  isSubmitting: boolean
}

const TwoFactorChallengeContext = createContext<TwoFactorChallengeContextData | null>(null)

export function TwoFactorChallengeProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const resolverRef = useRef<((value: string | null) => void) | null>(null)

  const challenge = useCallback(() => {
    setIsOpen(true)
    setIsSubmitting(false)

    return new Promise<string | null>((resolve) => {
      resolverRef.current = (value) => {
        resolve(value)
        queueMicrotask(() => {
          setIsOpen(false)
          setIsSubmitting(false)
        })
      }
    })
  }, [])

  const onComplete = useCallback((code: string | null) => {
    if (code) {
      setIsSubmitting(true)
      document.cookie = `X-2FA-Code=${code}; path=/; max-age=60; SameSite=Strict`
    } else {
      setIsOpen(false)
    }

    if (resolverRef.current) {
      resolverRef.current(code)
      resolverRef.current = null
    }
  }, [])

  useEffect(() => {
    return () => {
      if (resolverRef.current) {
        resolverRef.current(null)
        resolverRef.current = null
      }
    }
  }, [])

  return (
    <TwoFactorChallengeContext.Provider value={{ challenge, onComplete, isOpen, isSubmitting }}>
      {children}
      <TwoFactorChallengeDialog />
    </TwoFactorChallengeContext.Provider>
  )
}

export function useTwoFactorChallenge() {
  const context = useContext(TwoFactorChallengeContext)

  if (!context) {
    throw new Error('useTwoFactorChallenge must be used within a TwoFactorChallengeProvider')
  }

  return context
}