import { FechaISO } from '../../common/validators.js';

export class InformeQueryDto {
  @FechaISO()
  desde: string; // inclusive

  @FechaISO()
  hasta: string; // inclusive
}
