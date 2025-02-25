import type { AuthenticationFormType } from '../schemas/authentication-form.schema'

export function useAuthenticationFormSubmitHook() {
  const onSubmit = (data: AuthenticationFormType) =>
    console.log('Form data from SubmitButton:', data)
  return { onSubmit }
}
