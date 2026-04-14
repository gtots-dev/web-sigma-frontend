'use client'

import { useEffect } from 'react'

interface UseOtpInputParams {
  setValue: (name: string, value: string) => void
  resetField: (name: string) => void
}

export function useOtpInput({ setValue, resetField }: UseOtpInputParams) {
  const focusInput = () => {
    document.getElementById('otp_code')?.focus()
  }

  const normalize = (value: string) => value.replace(/\D/g, '')

  useEffect(() => {
    focusInput()
  }, [])

  useEffect(() => {
    const handleWindowFocus = async () => {
      try {
        const text = await navigator.clipboard.readText()
        const normalized = normalize(text)

        if (normalized.length === 6) {
          setValue('otp_code', normalized)
        }
      } catch {}
    }

    window.addEventListener('focus', handleWindowFocus)

    return () => {
      window.removeEventListener('focus', handleWindowFocus)
    }
  }, [setValue])

  const handlePaste = (pasted: string) => {
    const normalized = normalize(pasted)

    if (normalized.length === 6) {
      return normalized
    }

    return null
  }

  const handleClear = () => {
    resetField('otp_code')
    focusInput()
  }

  return {
    handlePaste,
    handleClear
  }
}
