type MessageKeys =
  | '7.1'
  | '7.2'
  | '7.3'
  | '7.4'
  | '7.5'
  | '7.6'
  | '7.7'
  | '7.8'
  | '7.9'
  | '7.10'

export const MESSAGES_PROCESSING_UNIT: Record<MessageKeys, string> = {
  '7.1': 'Unidade de Processamento',
  '7.2': 'Navegue pelas unidades de processamento disponíveis no sistema.',
  '7.3': 'Nenhuma unidade de processamento encontrada',
  '7.4': 'Nova unidade de contrato',
  '7.5':
    'Preencha os dados obrigatórios para adicionar uma nova unidade de processamento.',
  '7.6': 'O nome da unidade de processamento é obrigatório.',
  '7.7': 'Editar unidade de processamento',
  '7.8': 'Altere os dados desejados para editar a unidade de processamento.',
  '7.9': 'Habilitar/Desabilitar',
  '7.10':
    'Caso a opção correspondente esteja desabilitada, a unidade de processamento não estará mais disponível na lista.'
}
