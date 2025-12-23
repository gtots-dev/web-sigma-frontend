type MessageKeys =
  | '18.1'
  | '18.2'
  | '18.3'
  | '18.4'
  | '18.5'
  | '18.6'
  | '18.7'
  | '18.8'
  | '18.9'
  | '18.10'
  | '18.11'
  | '18.12'
  | '18.13'
  | '18.14'
  | '18.15'
  | '18.16'
  | '18.17'
  | '18.18'
  | '18.19'
  | '18.20'
  | '18.21'

export const MESSAGES_GROUP: Record<MessageKeys, string> = {
  '18.1': 'Grupos',
  '18.2': 'Navegue e gerencie seus grupos com suas faixas disponíveis.',
  '18.3': 'Nenhum grupo encontrado',
  '18.4': 'Novo Grupo',
  '18.5': 'Preencha os dados obrigatórios para adicionar um novo grupo.',
  '18.6': 'O nome do grupo é obrigatório.',
  '18.7': 'Editar Grupo',
  '18.8': 'Altere os dados desejados para editar o grupo.',
  '18.9': 'Habilitar/Desabilitar',
  '18.10':
    'Caso a opção correspondente esteja desabilitada, o grupo não estará mais disponível na lista.',
  '18.11': 'Vincular Faixas',
  '18.12': 'Selecione as faixas desejadas para o vinculo do grupo.',
  '18.13': 'O nome deve ter no máximo 150 caracteres.',
  '18.14': 'A descrição deve ter no máximo 150 caracteres.',
  '18.15': 'Informações do Grupo',
  '18.16': 'Veja mais informações sobre o grupo selecionado',
  '18.17': 'Vincular Pontos',
  '18.18': 'Selecione os pontos desejados para o vinculo do grupo.',
  '18.19': 'Vincular Outros Grupos',
  '18.20': 'Selecione os outros grupos desejados para o vinculo no grupo.',
  '18.21':
    'Você não possui permissão para visualizar os grupos disponíveis. Por favor, verifique com o seu responsável.'
}
