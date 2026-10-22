type MessageKeys =
  | '27.1'
  | '27.2'
  | '27.3'
  | '27.4'
  | '27.5'

export const MESSAGES_STATUS: Record<MessageKeys, string> = {
  '27.1': 'Status',
  '27.2':
    'Gerencie os status e regras de exceção para Unidades de Processamento e Faixas do contrato.',
  '27.3': 'Unidades de Processamento (U.P.s)',
  '27.4': 'Faixas',
  '27.5': 'Você não possui permissão para visualizar esta seção.'
}
