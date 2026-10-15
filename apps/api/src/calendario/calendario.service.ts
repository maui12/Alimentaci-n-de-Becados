import { Injectable } from '@nestjs/common';

export type TipoDia = 'normal' | '24h';

export interface DiaCalendario {
  fecha: string; // "2025-06-11"
  dia: number; // 11
  tipo: TipoDia;
  turnos: number; // cantidad de becados con turno ese día
}

export interface MesCalendario {
  anio: number;
  mes: number; // 1 a 12
  dias: DiaCalendario[];
}

/**
 * El servicio contiene la LÓGICA. Aquí vive la regla de negocio:
 * sábados, domingos y feriados exigen guardia de 24 horas.
 * Así web y móvil reciben lo mismo y ninguno tiene que calcularlo.
 */
@Injectable()
export class CalendarioService {
  // TODO: los feriados deben venir de la base de datos (cambian cada año)
  private readonly feriados: string[] = [];

  // TODO: esto son los datos fijos del mockup que estaban en el frontend.
  // Cuando exista la base de datos, se reemplaza por una consulta a la tabla de turnos.
  private readonly turnosEjemplo: Record<string, number> = {
    '2025-06-03': 14,
    '2025-06-04': 8,
    '2025-06-05': 9,
    '2025-06-06': 11,
    '2025-06-07': 7,
    '2025-06-10': 10,
    '2025-06-12': 9,
    '2025-06-13': 12,
  };

  obtenerMes(anio: number, mes: number): MesCalendario {
    // Día 0 del mes siguiente = último día de este mes
    const totalDias = new Date(Date.UTC(anio, mes, 0)).getUTCDate();
    const dias: DiaCalendario[] = [];

    for (let dia = 1; dia <= totalDias; dia++) {
      const fecha = this.formatearFecha(anio, mes, dia);
      dias.push({
        fecha,
        dia,
        tipo: this.esDia24h(anio, mes, dia, fecha) ? '24h' : 'normal',
        turnos: this.turnosEjemplo[fecha] ?? 0,
      });
    }

    return { anio, mes, dias };
  }

  private esDia24h(anio: number, mes: number, dia: number, fecha: string): boolean {
    // Se usa UTC para que la zona horaria del servidor no cambie el día de la semana
    const diaSemana = new Date(Date.UTC(anio, mes - 1, dia)).getUTCDay(); // 0 = domingo, 6 = sábado
    return diaSemana === 0 || diaSemana === 6 || this.feriados.includes(fecha);
  }

  private formatearFecha(anio: number, mes: number, dia: number): string {
    return `${anio}-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
  }
}