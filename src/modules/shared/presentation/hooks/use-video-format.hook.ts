/**
 * Formata o tempo em segundos para MM:SS (ex: 01:23).
 */
export function formatVideoTimecode(sec: number): string {
  if (isNaN(sec)) return '00:00'
  const mins = Math.floor(sec / 60).toString().padStart(2, '0')
  const secs = Math.floor(sec % 60).toString().padStart(2, '0')
  return `${mins}:${secs}`
}

/**
 * Formata o tempo em segundos para MM:SS.mmm (ex: 01:23.456).
 */
export function formatFrameTimecode(sec: number): string {
  if (isNaN(sec)) return '00:00.000'
  const mins = Math.floor(sec / 60).toString().padStart(2, '0')
  const secs = (sec % 60).toFixed(3).padStart(6, '0')
  return `${mins}:${secs}`
}
