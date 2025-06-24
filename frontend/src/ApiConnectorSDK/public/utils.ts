export function toInt(value: string | number): number {
  if (typeof value === 'number') {
    return value;
  }

  return parseInt(value, 10);
}

export const formatTimeText = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const hoursText = `${hours} hour${hours !== 1 ? 's' : ''}`;
  const minutesText = `${minutes} minute${minutes !== 1 ? 's' : ''}`;
  return `${hoursText} and ${minutesText}`;
};
