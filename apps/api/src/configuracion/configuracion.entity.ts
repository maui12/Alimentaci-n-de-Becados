import { Column, Entity, PrimaryColumn } from 'typeorm';

/** Una sola fila (id = 1) con los parámetros que edita la pantalla "Configuración". */
@Entity('configuracion')
export class Configuracion {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int', default: 6 })
  maxTurnosMes: number;

  @Column({ type: 'int', default: 24 })
  anticipacionMinimaHoras: number;

  @Column({ type: 'varchar', length: 80, default: 'Ovalle' })
  hospitalActivo: string;

  // Costos en pesos chilenos (enteros, CLP no usa decimales)
  @Column({ type: 'int', default: 4200 })
  costoDesayuno: number;

  @Column({ type: 'int', default: 6500 })
  costoAlmuerzo: number;

  @Column({ type: 'int', default: 3800 })
  costoOnce: number;

  @Column({ type: 'int', default: 6200 })
  costoCena: number;
}
