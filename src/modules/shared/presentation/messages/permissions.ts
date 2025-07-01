type MessageKeys =
  | '6.1'
  | '6.2'
  | '6.3'
  | '6.4'
  | '6.5'
  | '6.6'
  | '6.7'
  | '6.8'
  | '6.9'
  | '6.10'
  | '6.11'
  | '6.12'

export const MESSAGES_PERMISSIONS: Record<MessageKeys, string> = {
  '6.1': 'Permissões',
  '6.2': 'Navegue e gerencie os perfis de permissões disponíveis',
  '6.3': 'Nenhum perfil encontrado.',
  '6.4': 'Novo perfil de permissão',
  '6.5': 'Preencha os dados obrigatórios para adicionar um novo perfil.',
  '6.6': 'Nenhuma permissão encontrada.',
  '6.7': 'O nome do perfil é obrigatório.',
  '6.8': 'A descrição do perfil é obrigatória.',
  '6.9': 'A descrição deve ter no máximo 255 caracteres.',
  '6.10': 'Editar perfil de permissão',
  '6.11': 'Atualize os dados para editar o perfil desejado.',
  '6.12': 'Selecione um perfil para vincular ao usuário'
}
