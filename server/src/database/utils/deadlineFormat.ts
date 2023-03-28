
export function getDeadlineTime(_deadline?: Date) {
  if (!_deadline) return undefined;
  const deadline = new Date(_deadline);
  const options = { hour: '2-digit', minute: '2-digit' } as const;
  const time = deadline.toLocaleTimeString([], options);

  return time;
}

export function getDeadlineDate(_deadline?: Date) {
  if (!_deadline) return undefined;
  const deadline = new Date(_deadline);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' } as const;
  const date = deadline.toLocaleDateString(undefined, options);

  return date;
}
