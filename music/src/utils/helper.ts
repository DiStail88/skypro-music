export function formatTime(time: number): string {
  const minutes = Math.floor(time / 60);
  const seconds = (time % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

export function getUniqueValuesByKey(
  arr: TrackType[],
  key: keyof TrackType,
): string[] {
  const uniqueValues = new Set<string>();

  arr.forEach((item) => {
    const value = item[key];

    // Если массив строк
    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (v) uniqueValues.add(v);
      });
    }
    // Если одна строка
    else if (typeof value === 'string') {
      uniqueValues.add(value);
    }
  });

  return Array.from(uniqueValues);
}
