import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Becado } from '../becados/becado.entity.js';
import { CalendarioModule } from '../calendario/calendario.module.js';
import { ConfiguracionModule } from '../configuracion/configuracion.module.js';
import { Turno } from './turno.entity.js';
import { TurnosController } from './turnos.controller.js';
import { TurnosService } from './turnos.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Turno, Becado]), CalendarioModule, ConfiguracionModule],
  controllers: [TurnosController],
  providers: [TurnosService],
  exports: [TypeOrmModule],
})
export class TurnosModule {}
