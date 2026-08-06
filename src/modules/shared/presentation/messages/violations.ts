type MessageKeys =
  | '23.1'
  | '23.2'
  | '23.3'
  | '23.4'
  | '23.5'
  | '23.6'
  | '23.7'

export const MESSAGES_VIOLATIONS: Record<MessageKeys, string> = {
  '23.1': 'Violações',
  '23.2': 'Navegue e gerencie as violações disponíveis do contrato.',
  '23.3': 'Nenhuma violação encontrada',
  '23.4': 'Editar Violação',
  '23.5': 'Altere a cor desejada para a violação.',
  '23.6': 'A cor da violação é obrigatória.',
  '23.7': 'A cor da violação é inválida.'
}
