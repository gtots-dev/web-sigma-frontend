type MessageKeys =
  | '1.1'
  | '1.2'
  | '1.3'
  | '1.4'
  | '1.5'
  | '1.6'
  | '1.7'
  | '1.8'
  | '1.9'
  | '1.10'

export const MESSAGES_AUTHENTICATION: Record<MessageKeys, string> = {
  '1.1': 'Bem-vindo de volta!',
  '1.2':
    'Acesse sua conta para continuar. Insira suas credenciais abaixo e aproveite todos os recursos.',
  '1.3': 'O nome de usuário é obrigatório.',
  '1.4': 'A senha é obrigatória.',
  '1.5':
    'Nome de usuário ou senha inválidos. Verifique os dados e tente novamente.',
  '1.6': '© Copyright Traffic Safe Tecnologia S/A',
  '1.7': 'O campo de nome de usuário é obrigatório.',
  '1.8': 'O campo de senha é obrigatório.',
  '1.9': 'A senha pode ter no máximo 64 caracteres.',
  '1.10':
    'Ocorreu um erro inesperado ao processar sua solicitação. Por favor, tente novamente mais tarde.'
}
