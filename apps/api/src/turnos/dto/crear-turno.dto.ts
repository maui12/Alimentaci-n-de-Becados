import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { MesQueryDto } from './../../common/dto/mes-query.dto.js';
import { FechaISO } from './../../common/validators.js';

export class CrearTurnoDto {
  @IsInt() @Min(1)
  becadoId: number;

  @FechaISO()
  fecha: string;
}

export class ListarTurnosQueryDto extends MesQueryDto {
  @IsOptional() @Type(() => Number) @IsInt() @Min(1)
  becadoId?: number;
}
