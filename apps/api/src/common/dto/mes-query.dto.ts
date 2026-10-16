import { Type } from 'class-transformer';
import { IsInt, Max, Min } from 'class-validator';

export class MesQueryDto {
  @Type(() => Number)
  @IsInt()
  @Min(2000)
  @Max(2100)
  anio: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(12)
  mes: number;
}
