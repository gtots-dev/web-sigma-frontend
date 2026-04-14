type MessageKeys =
  | '21.1'
  | '21.2'
  | '21.3'
  | '21.4'

export const MESSAGES_TWO_FACTOR: Record<MessageKeys, string> = {
  '21.1': 'Verificação',
  '21.2':
    'Para continuar, insira o código de verificação enviado para o seu e-mail.',
  '21.3': 'Não compartilhe este código com ninguém.',
  '21.4': 'O código de verificação é obrigatório.',
}
