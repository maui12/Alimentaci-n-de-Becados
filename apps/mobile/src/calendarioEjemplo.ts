/**
 * DATOS FIJOS (solo para visualización).
 *
 * Esta función devuelve un objeto con la MISMA FORMA que más adelante devolverá
 * el backend (GET /api/calendario?anio=2025&mes=6). Así, cuando exista la API,
 * solo hay que cambiar esta llamada por un fetch y la pantalla no se toca.
 */

export type TipoDia = 'normal' | '24h';

export interface DiaCalendario {
  fecha: string; // "2025-06-11"
  dia: number; // 11
  tipo: TipoDia;
  turnos: number; // becados con turno ese día
}

export interface MesCalendario {
  anio: number;
  mes: number; // 1 a 12
  dias: DiaCalendario[];
}

// "Hoy" fijo para que la pantalla se vea igual que el mockup (11 de junio de 2025).
// Cuando haya backend, reemplazar por new Date().
export const HOY_DEMO = new Date(2025, 5, 11);

// Feriados de ejemplo (formato "AAAA-MM-DD"). Quedan vacíos a propósito:
// más adelante los entregará el backend.
const FERIADOS: string[] = [];

// Cantidad de becados con turno por día, tomada del mockup
const TURNOS_EJEMPLO: Record<string, number> = {
  '2025-06-03': 14,
  '2025-06-04': 8,
  '2025-06-05': 9,
  '2025-06-06': 11,
  '2025-06-07': 7,
  '2025-06-10': 10,
  '2025-06-12': 9,
  '2025-06-13': 12,
};

export function claveFecha(fecha: Date): string {
  const mm = String(fecha.getMonth() + 1).padStart(2, '0');
  const dd = String(fecha.getDate()).padStart(2, '0');
  return `${fecha.getFullYear()}-${mm}-${dd}`;
}

/** `mes` va de 1 (enero) a 12 (diciembre) */
export function obtenerMesEjemplo(anio: number, mes: number): MesCalendario {
  const totalDias = new Date(anio, mes, 0).getDate(); // día 0 del mes siguiente = último de este mes
  const dias: DiaCalendario[] = [];

  for (let dia = 1; dia <= totalDias; dia++) {
    const fecha = new Date(anio, mes - 1, dia);
    const clave = claveFecha(fecha);
    const diaSemana = fecha.getDay(); // 0 = domingo, 6 = sábado

    // Regla: sábados, domingos y feriados exigen guardia de 24 h
    const es24h = diaSemana === 0 || diaSemana === 6 || FERIADOS.includes(clave);

    dias.push({
      fecha: clave,
      dia,
      tipo: es24h ? '24h' : 'normal',
      turnos: TURNOS_EJEMPLO[clave] ?? 0,
    });
  }

  return { anio, mes, dias };
}