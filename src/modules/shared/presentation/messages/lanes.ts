type MessageKeys =
  | '8.1'
  | '8.2'
  | '8.3'
  | '8.4'
  | '8.5'
  | '8.6'
  | '8.7'
  | '8.8'
  | '8.9'
  | '8.10'

export const MESSAGES_LANE: Record<MessageKeys, string> = {
  '8.1': 'Faixas',
  '8.2':
    'Navegue e gerencie as faixas da U.P (Unidade de Processamento) disponível.',
  '8.3': 'Nenhuma faixa encontrada',
  '8.4': 'Nova faixa',
  '8.5': 'Preencha os dados obrigatórios para adicionar uma nova faixa.',
  '8.6': 'O nome da faixa é obrigatório.',
  '8.7': 'Editar faixa',
  '8.8': 'Altere os dados desejados para editar a faixa.',
  '8.9': 'Habilitar/Desabilitar',
  '8.10':
    'Caso a opção correspondente esteja desabilitada, a faixa não estará mais disponível na lista.'
}
