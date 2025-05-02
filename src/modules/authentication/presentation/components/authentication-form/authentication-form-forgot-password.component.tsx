import { HelpMeButtonComponent } from '@/modules/shared/presentation/components/help-me-button/help-me-button.component'

interface AuthenticationFormForgotPasswordComponentProps {
  description?: string
}

export function AuthenticationFormForgotPasswordComponent({
  description
}: AuthenticationFormForgotPasswordComponentProps) {
  if (!description) return null
  return (
    <HelpMeButtonComponent description={description} align='end'>
      <span className="text-xs underline text-end text-zinc-950 dark:text-zinc-50">
        Esqueci a minha senha
      </span>
    </HelpMeButtonComponent>
  )
}
