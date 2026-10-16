import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional } from 'class-validator';
import { CrearBecadoDto } from './crear-becado.dto.js';

export class ActualizarBecadoDto extends PartialType(CrearBecadoDto) {
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
