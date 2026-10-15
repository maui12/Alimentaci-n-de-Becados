/**
 * Dirección del backend.
 * En un celular físico NO sirve "localhost": hay que usar la IP de tu computador
 * en la red WiFi (ej. http://192.168.1.50:3000/api). Se configura en movil/.env:
 *
 *   EXPO_PUBLIC_API_URL=http://192.168.1.50:3000/api
 *
 * (Emulador Android: http://10.0.2.2:3000/api — Simulador iOS: http://localhost:3000/api)
 */
const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000/api';

export type TipoDia = 'normal' | '24h';

export interface DiaCalendario {
  fecha: string;
  dia: number;
  tipo: TipoDia;
  turnos: number;
}

export interface MesCalendario {
  anio: number;
  mes: number; // 1 a 12
  dias: DiaCalendario[];
}

export async function obtenerCalendario(anio: number, mes: number): Promise<MesCalendario> {
  const respuesta = await fetch(`${API_URL}/calendario?anio=${anio}&mes=${mes}`);

  if (!respuesta.ok) {
    throw new Error(`No se pudo cargar el calendario (error ${respuesta.status})`);
  }

  return respuesta.json();
}