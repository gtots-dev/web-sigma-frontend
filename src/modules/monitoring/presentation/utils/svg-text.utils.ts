export function truncateSvgText(text: string | undefined | null, maxWidth: number, fontSize: number): string {
  if (!text) return ''
  const charWidth = fontSize * 0.58
  const maxChars = Math.floor(maxWidth / charWidth)
  if (text.length <= maxChars) return text
  return text.slice(0, Math.max(1, maxChars - 1)) + '…'
}
