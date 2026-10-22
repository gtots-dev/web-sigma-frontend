type MessageKeys =
  | '25.1'
  | '25.2'
  | '25.3'
  | '25.4'
  | '25.5'
  | '25.6'
  | '25.7'
  | '25.8'
  | '25.9'
  | '25.10'
  | '25.11'
  | '25.12'

export const MESSAGES_STATUS_PROCESSING_UNITS: Record<MessageKeys, string> = {
  '25.1': 'Status de U.P.s',
  '25.2':
    'Visualize os status das U.P.s e defina quais serão ignorados no mapa operacional.',
  '25.3': 'Nenhum status de U.P. encontrado.',
  '25.4': 'Ignorar status',
  '25.5': 'Ignorar status em U.P.s',
  '25.6':
    'Selecione as U.P.s em que este status não será considerado erro no mapa operacional.',
  '25.7': 'Você não possui permissão para visualizar as U.P.s.',
  '25.8': 'Você não possui permissão para visualizar os status de U.P.s.',
  '25.9': 'Status não encontrado',
  '25.10': 'Selecione ao menos uma U.P.',
  '25.11': 'Mais informações sobre o status',
  '25.12': 'Veja as informações detalhadas do status e as U.P.s vinculadas.'
}
