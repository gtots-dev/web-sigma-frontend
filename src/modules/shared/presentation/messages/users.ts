type MessageKeys =
  | '5.1'
  | '5.2'
  | '5.3'
  | '5.4'
  | '5.5'
  | '5.6'
  | '5.7'
  | '5.8'
  | '5.9'
  | '5.10'
  | '5.11'
  | '5.12'
  | '5.13'
  | '5.14'
  | '5.15'
  | '5.16'
  | '5.17'
  | '5.18'
  | '5.19'
  | '5.20'
  | '5.21'
  | '5.22'
  | '5.23'
  | '5.24'
  | '5.25'
  | '5.26'
  | '5.27'
  | '5.28'
  | '5.29'
  | '5.30'
  | '5.31'
  | '5.32'

export const MESSAGES_USERS: Record<MessageKeys, string> = {
  '5.1': 'Usuários',
  '5.2': 'Navegue e gerencie os usuários disponíveis',
  '5.3': 'Nenhum usuário encontrado.',
  '5.4': 'Novo usuário',
  '5.5': 'Preencha os dados obrigatórios para adicionar um novo usuário.',
  '5.6': 'O nome é obrigatório.',
  '5.7': 'O email é obrigatório.',
  '5.8': 'A empresa é obrigatória.',
  '5.9': 'A posição é obrigatória.',
  '5.10': 'O nome de usuário é obrigatório.',
  '5.11': 'A senha do usuário é obrigatória.',
  '5.12': 'O e-mail informado é inválido.',
  '5.13': 'Usuário já cadastrado.',
  '5.14': 'Deseja vincular este usuário ao um contrato?',
  '5.15':
    'Avance para vincular o usuário ao contrato. Este passo é obrigatório.',
  '5.16': 'Vinculação de contrato',
  '5.17': 'Preencha os dados obrigatórios para vincular o contrato ao usuário.',
  '5.18': 'Este usuário já está vinculado ao contrato.',
  '5.19': 'Nenhum contrato encontrado.',
  '5.20': 'Formato de arquivo inválido. Utilize um formato compatível.',
  '5.21': 'Permissões',
  '5.22': 'Atribua as permissões desejadas ao usuário selecionado.',
  '5.23': 'Nenhuma permissão encontrada.',
  '5.24': 'Sair da vinculação de usuário?',
  '5.25': 'Ao sair, o progresso da vinculação será perdido. Deseja continuar?',
  '5.26': 'Nenhum arquivo selecionado',
  '5.27': 'Informações do usuário',
  '5.28': 'Veja mais informações sobre o usuário selecionado',
  '5.29': 'Editar Usuário',
  '5.30': 'Realize a edição dos dados para atualizar o usuário existente.',
  '5.31': 'Cada arquivo deve ter no máximo 10MB.',
  '5.32': 'A descrição deve ter no máximo 255 caracteres.'
}
