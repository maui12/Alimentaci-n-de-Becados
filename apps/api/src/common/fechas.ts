export function pad(n: number): string {
  return String(n).padStart(2, '0');
}

export function formatearFecha(anio: number, mes: number, dia: number): string {
  return `${anio}-${pad(mes)}-${pad(dia)}`;
}

/** Rango [desde, hasta) de un mes: "hasta" es el día 1 del mes siguiente (exclusivo). */
export function rangoMes(anio: number, mes: number): { desde: string; hasta: string } {
  const sigAnio = mes === 12 ? anio + 1 : anio;
  const sigMes = mes === 12 ? 1 : mes + 1;
  return { desde: formatearFecha(anio, mes, 1), hasta: formatearFecha(sigAnio, sigMes, 1) };
}
