import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turno } from '../turnos/turno.entity.js';
import { CalendarioController } from './calendario.controller.js';
import { CalendarioService } from './calendario.service.js';
import { Feriado } from './feriado.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Feriado, Turno])],
  controllers: [CalendarioController],
  providers: [CalendarioService],
  exports: [CalendarioService],
})
export class CalendarioModule {}
