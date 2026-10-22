type MessageKeys =
  | '26.1'
  | '26.2'
  | '26.3'
  | '26.4'
  | '26.5'
  | '26.6'
  | '26.7'
  | '26.8'
  | '26.9'
  | '26.10'
  | '26.11'
  | '26.12'

export const MESSAGES_STATUS_LANES: Record<MessageKeys, string> = {
  '26.1': 'Status de Faixas',
  '26.2':
    'Visualize os status das faixas e defina quais serão ignorados no mapa operacional.',
  '26.3': 'Nenhum status de faixa encontrado.',
  '26.4': 'Ignorar status',
  '26.5': 'Ignorar status em Faixas',
  '26.6':
    'Selecione as faixas em que este status não será considerado erro no mapa operacional.',
  '26.7': 'Você não possui permissão para visualizar as faixas.',
  '26.8': 'Você não possui permissão para visualizar os status de faixas.',
  '26.9': 'Status não encontrado',
  '26.10': 'Selecione ao menos uma faixa.',
  '26.11': 'Mais informações sobre o status',
  '26.12': 'Veja as informações detalhadas do status e as faixas vinculadas.'
}
