/** Deterministic index in [0, length) from a date key (e.g. YYYY-MM-DD). */
export function dailyIndexFromKey(dateKey: string, length: number): number {
  if (length <= 0) return 0;
  let h = 0;
  for (let i = 0; i < dateKey.length; i++) {
    h = (Math.imul(31, h) + dateKey.charCodeAt(i)) | 0;
  }
  return Math.abs(h) % length;
}
