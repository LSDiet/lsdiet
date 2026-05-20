// Lightweight reading-time estimate. Counts words in a text blob and
// converts at ~225 wpm with a 2-minute floor.

export function readingTimeMinutes(text: string): number {
  const words = (text.match(/\S+/g) || []).length;
  return Math.max(2, Math.round(words / 225));
}
