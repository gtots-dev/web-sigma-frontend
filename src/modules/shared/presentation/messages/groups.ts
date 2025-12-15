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
  | '14.13'
  | '14.14'
  | '14.15'
  | '14.16'
  | '14.17'
  | '14.18'
  | '14.19'
  | '14.20'
  | '14.21'

export const MESSAGES_GROUP: Record<MessageKeys, string> = {
  '14.1': 'Grupos',
  '14.2': 'Navegue e gerencie seus grupos com suas faixas disponíveis.',
  '14.3': 'Nenhum grupo encontrado',
  '14.4': 'Novo Grupo',
  '14.5': 'Preencha os dados obrigatórios para adicionar um novo grupo.',
  '14.6': 'O nome do grupo é obrigatório.',
  '14.7': 'Editar grupo',
  '14.8': 'Altere os dados desejados para editar o grupo.',
  '14.9': 'Habilitar/Desabilitar',
  '14.10':
    'Caso a opção correspondente esteja desabilitada, o grupo não estará mais disponível na lista.',
  '14.11': 'Vincular Faixas',
  '14.12': 'Selecione as faixas desejadas para o vinculo do grupo.',
  '14.13': 'O nome deve ter no máximo 150 caracteres.',
  '14.14': 'A descrição deve ter no máximo 150 caracteres.',
  '14.15': 'Informações do Grupo',
  '14.16': 'Veja mais informações sobre o grupo selecionado',
  '14.17': 'Vincular Pontos',
  '14.18': 'Selecione os pontos desejados para o vinculo do grupo.',
  '14.19': 'Vincular Outros Grupos',
  '14.20': 'Selecione os outros grupos desejados para o vinculo no grupo.',
  '14.21':
    'Você não possui permissão para visualizar os grupos disponíveis. Por favor, verifique com o seu responsável.'
}
