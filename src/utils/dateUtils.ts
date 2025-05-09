// Форматує ISO-рядок дати у локальний формат 'uk-UA'
export function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleString("uk-UA", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
