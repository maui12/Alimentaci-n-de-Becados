import { construirMes, tipoDeDia } from './calendario.util.js';

describe('calendario.util', () => {
  const sinFeriados = new Set<string>();

  it('marca sábados y domingos como 24h y los días de semana como normales', () => {
    expect(tipoDeDia(2026, 10, 16, sinFeriados)).toBe('normal'); // viernes
    expect(tipoDeDia(2026, 10, 17, sinFeriados)).toBe('24h'); // sábado
    expect(tipoDeDia(2026, 10, 18, sinFeriados)).toBe('24h'); // domingo
  });

  it('marca un feriado entre semana como 24h', () => {
    expect(tipoDeDia(2026, 9, 18, new Set(['2026-09-18']))).toBe('24h'); // viernes feriado
    expect(tipoDeDia(2026, 9, 18, sinFeriados)).toBe('normal');
  });

  it('calcula bien los días del mes, incluido febrero bisiesto y diciembre', () => {
    expect(construirMes(2026, 2, sinFeriados, {}).dias).toHaveLength(28);
    expect(construirMes(2028, 2, sinFeriados, {}).dias).toHaveLength(29);
    expect(construirMes(2026, 12, sinFeriados, {}).dias).toHaveLength(31);
  });

  it('incluye la cantidad de turnos por fecha', () => {
    const mes = construirMes(2026, 10, sinFeriados, { '2026-10-16': 3 });
    expect(mes.dias[15]).toEqual({ fecha: '2026-10-16', dia: 16, tipo: 'normal', turnos: 3 });
    expect(mes.dias[0].turnos).toBe(0);
  });
});
