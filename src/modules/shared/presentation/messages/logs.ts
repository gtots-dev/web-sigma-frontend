import { ActionLogs } from '@/modules/activity-report/domain/enums/logs.enum'

export const MESSAGES_LOGS: Record<ActionLogs, string> = {
  [ActionLogs.POST_AUTH_TOKEN]: 'Usuário se autenticou',
  [ActionLogs.POST_PERM_PROFILES]: 'Perfil de permissão criado',
  [ActionLogs.PATCH_PERM_PROFILES_STATUS]:
    'Status do perfil de permissão alterado',
  [ActionLogs.POST_PERM_PROFILES_ALL_IN_ONE]:
    'Perfil de permissão completo criado',
  [ActionLogs.POST_PERM_PROFILES_FEATURES]:
    'Feature adicionado ao perfil de permissão',
  [ActionLogs.DELETE_PERM_PROFILES_FEATURES]:
    'Feature removido do perfil de permissão',
  [ActionLogs.POST_OPERATIONS_USERS]: 'Operação de usuário registrada',
  [ActionLogs.POST_USERS]: 'Usuário criado',
  [ActionLogs.PATCH_USERS_STATUS]: 'Status do usuário alterado',
  [ActionLogs.PUT_USERS_PASSWORD_RESETS]: 'Senha do usuário redefinida',
  [ActionLogs.PATCH_USERS]: 'Dados do usuário atualizados',
  [ActionLogs.PUT_USERS_PASSWORDS]: 'Senha do usuário atualizada',
  [ActionLogs.POST_USERS_PASSWORDS]: 'Senha criada para o usuário',
  [ActionLogs.POST_USERS_PERM_PROFILES]:
    'Perfil de permissão vinculado ao usuário',
  [ActionLogs.PUT_USERS_PERM_PROFILES_ALL_IN_ONE]:
    'Perfis de permissão do usuário atualizados',
  [ActionLogs.DELETE_USERS_PERM_PROFILES]:
    'Perfil de permissão do usuário removido',
  [ActionLogs.POST_USERS_PERM_PROFILES_CONTRACTS]:
    'Contrato vinculado ao perfil de permissão do usuário',
  [ActionLogs.DELETE_USERS_PERM_PROFILES_CONTRACTS]:
    'Contrato removido do perfil de permissão do usuário',
  [ActionLogs.POST_CONTRACTS]: 'Contrato criado'
}
