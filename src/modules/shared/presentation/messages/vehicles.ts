type MessageKeys =
  | '20.1'
  | '20.2'
  | '20.3'
  | '20.4'
  | '20.5'
  | '20.6'
  | '20.7'
  | '20.8'
  | '20.9'
  | '20.10'
  | '20.11'
  | '20.12'

export const MESSAGES_VEHICLES: Record<MessageKeys, string> = {
  '20.1': 'Tipos de Veículos',
  '20.2': 'Navegue e gerencie seus tipos de veículos disponíveis.',
  '20.3': 'Nenhum tipo veículo encontrado',
  '20.4': 'Novo Tipo de Veículo',
  '20.5':
    'Preencha os dados obrigatórios para adicionar um novo tipo de veículo.',
  '20.6': 'O nome do tipo veículo é obrigatório.',
  '20.7': 'O campo deve ter no máximo 150 caracteres.',
  '20.8': 'A cor do tipo veículo é obrigatória.',
  '20.9': 'A cor do tipo veículo é invalida.',
  '20.10': 'Editar Tipo de Veículo',
  '20.11': 'Altere os dados desejados para editar o tipo do veículo.',
  '20.12': 'O campo código deve ser obrigatório.'
}
