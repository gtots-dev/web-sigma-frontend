type MessageKeys =
  | '3.1'
  | '3.2'
  | '3.3'
  | '3.4'
  | '3.5'
  | '3.6'
  | '3.9'
  | '3.10'
  | '3.11'
  | '3.12'
  | '3.13'
  | '3.14'
  | '3.15'
  | '3.17'
  | '3.18'
  | '3.19'
  | '3.20'
  | '3.21'

export const MESSAGES_CONTRACTS: Record<MessageKeys, string> = {
  '3.1': 'Contratos',
  '3.2': 'Navegue e gerencie os contratos disponíveis.',
  '3.3': 'Nenhum contrato encontrado.',
  '3.4': 'Novo contrato',
  '3.5': 'Preencha os dados obrigatórios para adicionar um novo contrato.',
  '3.6': 'O nome do contrato é obrigatório.',
  '3.9': 'Este contrato já está cadastrado no sistema.',
  '3.10': 'Vincular usuário?',
  '3.11':
    'Você será redirecionado para o formulário de vinculação de usuário ao contrato.',
  '3.12': 'Vincular usuário',
  '3.13': 'Preencha os dados obrigatórios para vincular o usuário.',
  '3.14': 'Este usuário já está vinculado ao contrato.',
  '3.15': 'Nenhum usuário encontrado.',
  '3.17': 'Permissões',
  '3.18': 'Atribua as permissões desejadas ao usuário selecionado.',
  '3.19': 'Nenhuma permissão encontrada.',
  '3.20': 'Sair da vinculação de usuário?',
  '3.21': 'Ao sair, o progresso da vinculação será perdido. Deseja continuar?'
}
