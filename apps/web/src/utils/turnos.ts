/**
 * Utilidades del calendario de turnos.
 * Son funciones puras: no usan React, así que se pueden reutilizar y probar solas.
 */

export type TipoDia = 'normal' | '24h';

export interface DiaMes {
  dia: number;
  fecha: Date;
  tipo: TipoDia;
}

export const NOMBRES_MESES = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

// El calendario empieza en lunes, como en el mockup
export const DIAS_SEMANA = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

/** Convierte una fecha a texto "2025-06-11" (sin problemas de zona horaria) */
export function claveFecha(fecha: Date): string {
  const mm = String(fecha.getMonth() + 1).padStart(2, '0');
  const dd = String(fecha.getDate()).padStart(2, '0');
  return `${fecha.getFullYear()}-${mm}-${dd}`;
}

/**
 * Regla de negocio: sábados, domingos y feriados exigen guardia de 24 h.
 * `feriados` es una lista de fechas "AAAA-MM-DD". Más adelante la entregará el backend.
 */
export function esDia24h(fecha: Date, feriados: string[] = []): boolean {
  const diaSemana = fecha.getDay(); // 0 = domingo, 6 = sábado
  return diaSemana === 0 || diaSemana === 6 || feriados.includes(claveFecha(fecha));
}

/**
 * Devuelve las celdas de un mes para dibujar la grilla.
 * Las celdas vacías antes del día 1 se representan con `null`.
 * `mes` va de 0 (enero) a 11 (diciembre).
 */
export function generarMes(
  anio: number,
  mes: number,
  feriados: string[] = [],
): (DiaMes | null)[] {
  const primerDia = new Date(anio, mes, 1);
  const totalDias = new Date(anio, mes + 1, 0).getDate();
  const huecosIniciales = (primerDia.getDay() + 6) % 7; // lunes = 0

  const celdas: (DiaMes | null)[] = Array.from({ length: huecosIniciales }, () => null);

  for (let dia = 1; dia <= totalDias; dia++) {
    const fecha = new Date(anio, mes, dia);
    celdas.push({
      dia,
      fecha,
      tipo: esDia24h(fecha, feriados) ? '24h' : 'normal',
    });
  }

  return celdas;
}