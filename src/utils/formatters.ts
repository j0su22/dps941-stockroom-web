export function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-SV").format(new Date(value));
}
