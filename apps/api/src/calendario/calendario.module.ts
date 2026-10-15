import { Module } from '@nestjs/common';
import { CalendarioController } from './calendario.controller.js';
import { CalendarioService } from './calendario.service.js';

/**
 * El módulo agrupa las piezas de una misma funcionalidad.
 * Luego se registra en AppModule (imports: [CalendarioModule]).
 */
@Module({
  controllers: [CalendarioController],
  providers: [CalendarioService],
  exports: [CalendarioService], // para que otros módulos (ej. dashboard) puedan usarlo
})
export class CalendarioModule {}