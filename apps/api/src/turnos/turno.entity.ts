import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Becado } from '../becados/becado.entity.js';

export type TipoDia = 'normal' | '24h';

@Entity('turnos')
@Unique(['becadoId', 'fecha']) // un becado no puede tener dos turnos el mismo día
export class Turno {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  becadoId: number;

  @ManyToOne(() => Becado, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'becadoId' })
  becado: Becado;

  @Index()
  @Column({ type: 'date' })
  fecha: string; // AAAA-MM-DD

  @Column({ type: 'varchar', length: 10, default: 'normal' })
  tipo: TipoDia;

  @CreateDateColumn()
  creadoEn: Date;
}
