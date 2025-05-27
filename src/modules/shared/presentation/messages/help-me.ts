type MessagesHelpMeType = {
  username: string
  password: string
  forgotPassword: string
  newPassword: string
}

export const MESSAGES_HELP_ME: MessagesHelpMeType = {
  username: `O nome de usuário é obrigatório.
  Por favor, forneça o nome de usuário válido.`,
  password: `A senha é obrigatória.
  Ela deve ter no máximo 64 caracteres.`,
  newPassword: `Senha é obrigatória.
  Máximo 64 caracteres.
  Conter pelo menos uma letra maiúscula.
  Conter pelo menos uma letra minúscula.
  Conter pelo menos um número.
  Conter pelo menos um caractere especial (#, @, $, !, %, *, ?, &).`,
  forgotPassword: `Entre em contato com seu gestor para que ele possa solicitar a redefinição de sua senha.
  `
}
