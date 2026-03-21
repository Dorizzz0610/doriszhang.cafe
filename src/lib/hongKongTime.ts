/**
 * Calendar date / weekday in Asia/Hong_Kong — same “day” as navbar
 * “Saturday’s color: Warm Taupe” and Film/Philosophy of the day.
 */
const HK_TZ = 'Asia/Hong_Kong';

/** YYYY-MM-DD in Hong Kong (for daily deterministic picks) */
export function getHongKongDateKey(date: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: HK_TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

/** 0 = Sunday … 6 = Saturday (Hong Kong local calendar day) */
export function getHongKongDayOfWeek(date: Date = new Date()): number {
  const weekday = new Intl.DateTimeFormat('en-US', {
    timeZone: HK_TZ,
    weekday: 'short',
  }).format(date);
  const map: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  return map[weekday] ?? 0;
}

/** e.g. "March 21, 2026" — Hong Kong */
export function formatHongKongLongDate(date: Date = new Date()): string {
  return date.toLocaleDateString('en-US', {
    timeZone: HK_TZ,
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

/** e.g. "Saturday" — Hong Kong */
export function getHongKongWeekdayName(date: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: HK_TZ,
    weekday: 'long',
  }).format(date);
}
