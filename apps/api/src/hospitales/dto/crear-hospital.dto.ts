import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CrearHospitalDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  nombre: string;
}
