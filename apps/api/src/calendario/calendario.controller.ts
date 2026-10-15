import {
  BadRequestException,
  Controller,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import type { CalendarioService, MesCalendario } from './calendario.service.js';

/**
 * El controlador solo RECIBE la petición, valida lo básico
 * y delega el trabajo al servicio. No tiene lógica de negocio.
 *
 * Ruta final (con el prefijo global "api" de main.ts):
 *   GET /api/calendario?anio=2025&mes=6
 */
@Controller('calendario')
export class CalendarioController {
  constructor(private readonly calendarioService: CalendarioService) {}

  @Get()
  obtenerMes(
    @Query('anio', ParseIntPipe) anio: number,
    @Query('mes', ParseIntPipe) mes: number,
  ): MesCalendario {
    if (mes < 1 || mes > 12) {
      throw new BadRequestException('El mes debe estar entre 1 y 12');
    }
    return this.calendarioService.obtenerMes(anio, mes);
  }
}