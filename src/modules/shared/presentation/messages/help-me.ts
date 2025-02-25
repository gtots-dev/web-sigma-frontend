type MessagesHelpMeType = {
  username: string
  password: string
  forgotPassword: string
}

export const MESSAGES_HELP_ME: MessagesHelpMeType = {
  username: `O nome de usuário é obrigatório.
  Por favor, forneça o nome de usuário válido.`,
  password: `A senha é obrigatória.
  Ela deve ter no máximo 64 caracteres.
  Ela deve conter pelo menos:
  - 1 letra maiúscula (A-Z)
  - 1 letra minúscula (a-z)
  - 1 número (0-9)
  - 1 caractere especial: #, @, $, !, %, *, ?, &.`,
  forgotPassword: `Entre em contato com seu gestor para que ele possa solicitar a redefinição de sua senha.
  `
}
