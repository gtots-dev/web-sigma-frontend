'use client'

import { ThemeToggle } from '@/modules/shared/presentation/components/theme-toggle/theme-toggle.component'
import { MESSAGES_TWO_FACTOR } from '@/modules/shared/presentation/messages/two-factor'
import type { TwoFactorInterface } from '@/modules/two-factor/domain/interfaces/two-factor.interface'
import { TwoFactorCard } from '@/modules/two-factor/presentation/components/two-factor-card'
import { TwoFactorForm } from '@/modules/two-factor/presentation/components/two-factor-form'
import { TwoFactorFormCard } from '@/modules/two-factor/presentation/components/two-factor-form-card'
import { usePostTwoFactorSubmit } from '@/modules/two-factor/presentation/hooks/use-post-two-factor-submit.hook'
import { useTwoFactorStore } from '@/modules/two-factor/presentation/stores/two-factor.store'

interface Data {
  title: string
  description: string
  descriptionMenu: string
}

export default function TwoFactorPage() {
  const { postTwoFactor } = useTwoFactorStore()
  const { onAction } = usePostTwoFactorSubmit()

  const data: Data = {
    title: MESSAGES_TWO_FACTOR['21.1'],
    description: MESSAGES_TWO_FACTOR['21.2'],
    descriptionMenu: MESSAGES_TWO_FACTOR['21.3']
  }
  return (
    <TwoFactorCard.Root description={data.descriptionMenu}>
      <TwoFactorCard.Content>
        <TwoFactorFormCard.Root>
          <TwoFactorFormCard.Header>
            <TwoFactorFormCard.Title title={data.title} />
            <TwoFactorFormCard.Description description={data.description} />
          </TwoFactorFormCard.Header>

          <TwoFactorFormCard.Content>
            <TwoFactorForm.Form>
              <TwoFactorForm.Input.otp />
            </TwoFactorForm.Form>
          </TwoFactorFormCard.Content>
          <TwoFactorFormCard.Footer>
            <TwoFactorForm.Input.resend
              onResend={postTwoFactor}
              cooldownSeconds={300}
            >
              <TwoFactorForm.Submit
                onSubmit={(otp: TwoFactorInterface) => onAction(otp)}
              />
            </TwoFactorForm.Input.resend>

            <TwoFactorForm.Cancel />
          </TwoFactorFormCard.Footer>
        </TwoFactorFormCard.Root>
      </TwoFactorCard.Content>

      <ThemeToggle className="fixed top-10 right-10" title="Altere seu tema" />
    </TwoFactorCard.Root>
  )
}
