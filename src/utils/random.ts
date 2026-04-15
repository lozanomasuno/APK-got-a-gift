export function pickRandomItem<T>(items: T[]): T | null {
  if (!items.length) {
    return null;
  }

  const index = Math.floor(Math.random() * items.length);
  return items[index];
}
