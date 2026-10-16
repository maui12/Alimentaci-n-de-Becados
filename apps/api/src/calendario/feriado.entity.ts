import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('feriados')
export class Feriado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', unique: true })
  fecha: string; // AAAA-MM-DD

  @Column({ type: 'varchar', length: 100 })
  nombre: string;
}
