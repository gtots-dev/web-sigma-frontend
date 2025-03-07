type MessagesHelpMeType = {
  username: string
  password: string
  forgotPassword: string
}

export const MESSAGES_HELP_ME: MessagesHelpMeType = {
  username: `O nome de usuário é obrigatório.
  Por favor, forneça o nome de usuário válido.`,
  password: `A senha é obrigatória.
  Ela deve ter no máximo 64 caracteres.`,
  forgotPassword: `Entre em contato com seu gestor para que ele possa solicitar a redefinição de sua senha.
  `
}