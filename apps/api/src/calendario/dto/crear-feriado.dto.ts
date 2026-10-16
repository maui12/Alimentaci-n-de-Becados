import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, Max, MaxLength, Min } from 'class-validator';
import { FechaISO } from '../../common/validators.js';

export class CrearFeriadoDto {
  @FechaISO()
  fecha: string;

  @IsString() @IsNotEmpty() @MaxLength(100)
  nombre: string;
}

export class FeriadosQueryDto {
  @Type(() => Number) @IsInt() @Min(2000) @Max(2100)
  anio: number;
}
