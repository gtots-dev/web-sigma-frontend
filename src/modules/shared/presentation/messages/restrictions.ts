type MessageKeys =
  | '24.1'
  | '24.2'
  | '24.3'
  | '24.4'
  | '24.5'
  | '24.6'
  | '24.7'
  | '24.10'
  | '24.11'
  | '24.12'

export const MESSAGES_RESTRICTIONS: Record<MessageKeys, string> = {
  '24.1': 'Restrições',
  '24.2': 'Navegue e gerencie as restrições disponíveis do contrato.',
  '24.3': 'Nenhuma restrição encontrada',
  '24.4': 'Adicionar Restrição',
  '24.5': 'Preencha os dados obrigatórios para adicionar uma nova restrição.',
  '24.6': 'O nome da restrição é obrigatório.',
  '24.7': 'O campo deve ter no máximo 150 caracteres.',
  '24.10': 'Editar Restrição',
  '24.11': 'Altere os dados desejados para editar a restrição.',
  '24.12': 'O campo código é obrigatório.'
}
