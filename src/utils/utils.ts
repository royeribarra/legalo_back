export function formatearFecha(fecha: Date): string {
  const newDate = new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(fecha);
  return newDate;
}
