import { formatearFecha } from '../common/fechas.js';

export type TipoDia = 'normal' | '24h';

export interface DiaCalendario {
  fecha: string; // "2026-06-11"
  dia: number;
  tipo: TipoDia;
  turnos: number; // becados con turno ese día
}

export interface MesCalendario {
  anio: number;
  mes: number; // 1 a 12
  dias: DiaCalendario[];
}

/** Funciones puras (sin base de datos): fáciles de probar. Usan UTC para no depender de la zona del servidor. */
export function esFinDeSemana(anio: number, mes: number, dia: number): boolean {
  const diaSemana = new Date(Date.UTC(anio, mes - 1, dia)).getUTCDay(); // 0 = domingo, 6 = sábado
  return diaSemana === 0 || diaSemana === 6;
}

export function tipoDeDia(anio: number, mes: number, dia: number, feriados: ReadonlySet<string>): TipoDia {
  return esFinDeSemana(anio, mes, dia) || feriados.has(formatearFecha(anio, mes, dia)) ? '24h' : 'normal';
}

export function construirMes(
  anio: number,
  mes: number,
  feriados: ReadonlySet<string>,
  turnosPorFecha: Readonly<Record<string, number>>,
): MesCalendario {
  const totalDias = new Date(Date.UTC(anio, mes, 0)).getUTCDate(); // día 0 del mes siguiente
  const dias: DiaCalendario[] = [];
  for (let dia = 1; dia <= totalDias; dia++) {
    const fecha = formatearFecha(anio, mes, dia);
    dias.push({ fecha, dia, tipo: tipoDeDia(anio, mes, dia, feriados), turnos: turnosPorFecha[fecha] ?? 0 });
  }
  return { anio, mes, dias };
}
