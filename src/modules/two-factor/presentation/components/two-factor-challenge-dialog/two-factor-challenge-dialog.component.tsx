'use client'

import { useEffect, useCallback } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription
} from '@/modules/shared/presentation/components/shadcn/dialog'
import { TwoFactorForm } from '../two-factor-form'
import { TwoFactorFormCard } from '../two-factor-form-card'
import { useTwoFactorChallenge } from '../../contexts/two-factor-challenge.context'
import { useTwoFactorStore } from '../../stores/two-factor.store'
import { MESSAGES_TWO_FACTOR } from '@/modules/shared/presentation/messages/two-factor'
import type { TwoFactorInterface } from '@/modules/two-factor/domain/interfaces/two-factor.interface'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'

export function TwoFactorChallengeDialog() {
  const { isOpen, onComplete, isSubmitting } = useTwoFactorChallenge()
  const { postTwoFactor } = useTwoFactorStore()

  useEffect(() => {
    if (isOpen) {
      postTwoFactor()
    }
  }, [isOpen, postTwoFactor])

  const handleVerify = useCallback(
    async (twoFactor: TwoFactorInterface) => {
      onComplete(twoFactor.otp_code)
    },
    [onComplete]
  )

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && !isSubmitting && onComplete(null)}>
      <DialogContent className="sm:max-w-[425px] p-10 overflow-hidden">
        <DialogTitle className="sr-only">
          {MESSAGES_TWO_FACTOR['21.1']}
        </DialogTitle>
        <DialogDescription className="sr-only">
          {MESSAGES_TWO_FACTOR['21.2']}
        </DialogDescription>
        <TwoFactorFormCard.Root>
          <TwoFactorFormCard.Header>
            <TwoFactorFormCard.Title title={MESSAGES_TWO_FACTOR['21.1']} />
            <TwoFactorFormCard.Description
              description={MESSAGES_TWO_FACTOR['21.2']}
            />
          </TwoFactorFormCard.Header>

          <TwoFactorFormCard.Content>
            <TwoFactorForm.Form>
              <TwoFactorForm.Input.OTP />
            </TwoFactorForm.Form>
          </TwoFactorFormCard.Content>

          <TwoFactorFormCard.Footer>
            <TwoFactorForm.Input.Resend
              onResend={postTwoFactor}
              cooldownSeconds={300}
            >
              <TwoFactorForm.Submit onSubmit={handleVerify} disabled={isSubmitting} />
            </TwoFactorForm.Input.Resend>

            <Button
              type="button"
              variant="ghost"
              disabled={isSubmitting}
              className="w-full text-sm text-zinc-700 dark:text-zinc-300 dark:hover:text-zinc-50 border-1 hover:bg-transparent hover:border"
              onClick={() => onComplete(null)}
            >
              Cancelar
            </Button>
          </TwoFactorFormCard.Footer>
        </TwoFactorFormCard.Root>
      </DialogContent>
    </Dialog>
  )
}

