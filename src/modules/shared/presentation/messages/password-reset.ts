type MessageKeys =
  | '2.1'
  | '2.2'
  | '2.3'
  | '2.4'
  | '2.5'
  | '2.6'
  | '2.7'
  | '2.8'
  | '2.9'
  | '2.10'
  | '2.11'
  | '2.12'
  | '2.13'
  | '2.14'
  | '2.15'
  | '2.16'
  | '2.17'

export const MESSAGES_PASSWORD_RESET: Record<MessageKeys, string> = {
  '2.1': 'Defina sua nova senha',
  '2.2':
    'Para sua segurança, altere sua senha. Essa alteração é única. No futuro, apenas o administrador poderá solicitar a redefinição.',
  '2.3': 'A nova senha é obrigatória.',
  '2.4': 'A confirmação da senha é obrigatória.',
  '2.5': 'As senhas são diferentes.',
  '2.6': 'A senha já está sendo utilizada!',
  '2.7': 'O campo de senha é obrigatório.',
  '2.8': 'A senha pode ter no máximo 64 caracteres.',
  '2.9': 'A senha deve conter pelo menos uma letra maiúscula.',
  '2.10': 'A senha deve conter pelo menos uma letra minúscula.',
  '2.11': 'A senha deve conter pelo menos um número.',
  '2.12':
    'A senha deve conter pelo menos um caractere especial (#, @, $, !, %, *, ?, &).',
  '2.13': '© Copyright Traffic Safe Tecnologia S/A',
  '2.14': 'Solicitação de redefinição',
  '2.15':
    'Solicite a redefinição abaixo. Um e-mail com o link será enviado ao usuário.',
  '2.16': 'O prazo deve ser um número inteiro maior que 0',
  '2.17': 'O prazo não pode ser superior a um ano.'
}
