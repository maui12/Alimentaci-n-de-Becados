import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';

export class CrearBecadoDto {
  @IsString() @IsNotEmpty() @MaxLength(120)
  nombre: string;

  @IsString() @IsNotEmpty() @MaxLength(100)
  especialidad: string;

  @IsInt() @Min(1)
  hospitalId: number;
}
