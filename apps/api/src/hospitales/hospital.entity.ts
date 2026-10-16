import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('hospitales')
export class Hospital {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 80, unique: true })
  nombre: string;
}
