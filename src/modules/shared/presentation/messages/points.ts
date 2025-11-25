type MessageKeys =
  | '14.1'
  | '14.2'
  | '14.3'
  | '14.4'
  | '14.5'
  | '14.6'
  | '14.7'
  | '14.8'
  | '14.9'
  | '14.10'
  | '14.11'
  | '14.12'

export const MESSAGES_POINT: Record<MessageKeys, string> = {
  '14.1': 'Pontos',
  '14.2': 'Navegue e gerencie seus pontos com suas faixas disponíveis.',
  '14.3': 'Nenhum ponto encontrado',
  '14.4': 'Novo Ponto',
  '14.5': 'Preencha os dados obrigatórios para adicionar um novo ponto.',
  '14.6': 'O nome do ponto é obrigatório.',
  '14.7': 'Editar ponto',
  '14.8': 'Altere os dados desejados para editar o ponto.',
  '14.9': 'Habilitar/Desabilitar',
  '14.10':
    'Caso a opção correspondente esteja desabilitada, o ponto não estará mais disponível na lista.',
  '14.11': 'Vincular Faixas',
  '14.12': 'Selecione as faixas desejadas para o vinculo do ponto.'
}
