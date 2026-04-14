'use client'

import { useEffect, useState } from 'react'

interface UseOtpResendParams {
  cooldownSeconds: number
  onResend: () => Promise<void>
}

export function useOtpResend({
  cooldownSeconds,
  onResend
}: UseOtpResendParams) {
  const [cooldown, setCooldown] = useState(0)
  const [isResending, setIsResending] = useState(false)

  const isBlocked = cooldown > 0

  useEffect(() => {
    if (cooldown <= 0) return

    const interval = setInterval(() => {
      setCooldown((prev) => Math.max(prev - 1, 0))
    }, 1000)

    return () => clearInterval(interval)
  }, [cooldown])

  const handleResend = async () => {
    if (isBlocked || isResending) return

    try {
      setIsResending(true)

      await onResend()

      setCooldown(cooldownSeconds)
    } finally {
      setIsResending(false)
    }
  }

  return {
    cooldown,
    isBlocked,
    isResending,
    handleResend
  }
}
