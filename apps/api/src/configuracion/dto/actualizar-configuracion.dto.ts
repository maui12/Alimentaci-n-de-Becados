import { IsInt, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';

export class ActualizarConfiguracionDto {
  @IsOptional() @IsInt() @Min(1) @Max(31)
  maxTurnosMes?: number;

  @IsOptional() @IsInt() @Min(0) @Max(720)
  anticipacionMinimaHoras?: number;

  @IsOptional() @IsString() @MaxLength(80)
  hospitalActivo?: string;

  @IsOptional() @IsInt() @Min(0) @Max(1_000_000)
  costoDesayuno?: number;

  @IsOptional() @IsInt() @Min(0) @Max(1_000_000)
  costoAlmuerzo?: number;

  @IsOptional() @IsInt() @Min(0) @Max(1_000_000)
  costoOnce?: number;

  @IsOptional() @IsInt() @Min(0) @Max(1_000_000)
  costoCena?: number;
}
