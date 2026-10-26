import type {
  LaneStatusMessage,
  StatusElement,
  StatusGroup,
  UpStatusMessage
} from '../../domain/interfaces/monitoring-dashboard-websocket.interface'

/**
 * Camada isolada de normalização de status ignorados no Mapa Operacional.
 *
 * Quando `el.ignore === true`:
 * - O `level` efetivo passa a ser `0` (OK / verde) para toda a visualização geral
 *   (células do mapa/grid/hexágono, filtros, contadores e resumo de U.P./Faixa).
 * - O nível original enviado pelo equipamento é preservado em `originalLevel`
 *   para ser exibido no menu detalhado de status da U.P. ou Faixa.
 */
export function normalizeStatusElementIgnore(
  element: StatusElement
): StatusElement {
  const originalLevel = element.originalLevel ?? element.level
  const isIgnored = Boolean(element.ignore)

  return {
    ...element,
    ignore: isIgnored,
    originalLevel,
    level: isIgnored ? 0 : originalLevel
  }
}

export function normalizeStatusGroupsIgnore(
  groups?: StatusGroup[]
): StatusGroup[] {
  if (!Array.isArray(groups)) return []

  return groups.map((group) => ({
    ...group,
    elements: Array.isArray(group.elements)
      ? group.elements.map(normalizeStatusElementIgnore)
      : []
  }))
}

export function applyStatusIgnoreLayer<
  T extends UpStatusMessage | LaneStatusMessage
>(message: T): T {
  if (!message?.request?.items) return message

  return {
    ...message,
    request: {
      ...message.request,
      items: normalizeStatusGroupsIgnore(message.request.items)
    }
  }
}

/**
 * Resolve os dados originais do elemento para exibição no menu detalhado de status.
 */
export function resolveDetailedStatusElement(element: StatusElement) {
  return {
    displayLevel: element.originalLevel ?? element.level,
    isIgnored: Boolean(element.ignore)
  }
}
