type MessageKeys =
  | '22.1'
  | '22.2'
  | '22.3'
  | '22.4'
  | '22.5'
  | '22.6'

export const MESSAGES_INFRACTIONS: Record<MessageKeys, string> = {
  '22.1': 'Visualizador de Registros',
  '22.2': 'Visualize e filtre pelas infrações registradas.',
  '22.3': 'Filtros de Busca',
  '22.4':
    'Refine a visualização por pontos, faixas, grupos, data/hora, violações e restrições',
  '22.5': 'Nenhum registro encontrado.',
  '22.6': 'Carregando registros...'
}
