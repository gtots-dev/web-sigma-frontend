'use client'

import { use } from 'react'
import type { PasswordResetFormInterface } from '@/modules/password-reset/domain/interfaces/password-reset-form.interface'
import { PasswordResetCard } from '@/modules/password-reset/presentation/components/password-reset-card'
import { PasswordResetForm } from '@/modules/password-reset/presentation/components/password-reset-form'
import { PasswordResetFormCard } from '@/modules/password-reset/presentation/components/password-reset-form-card'
import { PutPasswordResetForm } from '@/modules/password-reset/presentation/components/password-reset-form-provider'
import { usePasswordResetSubmit } from '@/modules/password-reset/presentation/hooks/password-reset-submit.hook'
import { MESSAGES_HELP_ME } from '@/modules/shared/presentation/messages/help-me'
import { MESSAGES_PASSWORD_RESET } from '@/modules/shared/presentation/messages/password-reset'

interface Data {
  title: string
  description: string
  copyright: string
  helpMePassword: string
}

export default function PasswordResetPage({
  params
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = use(params)
  const { onAction } = usePasswordResetSubmit()

  const data: Data = {
    title: MESSAGES_PASSWORD_RESET['2.1'],
    description: MESSAGES_PASSWORD_RESET['2.2'],
    copyright: MESSAGES_PASSWORD_RESET['2.13'],
    helpMePassword: MESSAGES_HELP_ME['newPassword']
  }

  return (
    <PasswordResetCard.Root copyright={data.copyright}>
      <PasswordResetCard.Content>
        <PasswordResetFormCard.Root>
          <PasswordResetFormCard.Header>
            <PasswordResetFormCard.Title title={data.title} />
            <PasswordResetFormCard.Description description={data.description} />
          </PasswordResetFormCard.Header>

          <PutPasswordResetForm.Provider>
            <PasswordResetFormCard.Content>
              <PasswordResetForm.Form>
                <PasswordResetForm.Input.Password
                  description={data.helpMePassword}
                  require
                />
                <PasswordResetForm.Input.PasswordConfirm
                  description={data.helpMePassword}
                  require
                />
              </PasswordResetForm.Form>
            </PasswordResetFormCard.Content>
            <PasswordResetFormCard.Footer>
              <PasswordResetForm.Submit
                onSubmit={(Passwords: PasswordResetFormInterface) =>
                  onAction(Passwords, token)
                }
              />
            </PasswordResetFormCard.Footer>
          </PutPasswordResetForm.Provider>
        </PasswordResetFormCard.Root>
      </PasswordResetCard.Content>
    </PasswordResetCard.Root>
  )
}
