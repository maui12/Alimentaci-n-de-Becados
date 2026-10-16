import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hospital } from '../hospitales/hospital.entity.js';
import { Pedido } from '../pedidos/pedido.entity.js';
import { Turno } from '../turnos/turno.entity.js';
import { InformesController } from './informes.controller.js';
import { InformesService } from './informes.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Hospital, Turno, Pedido])],
  controllers: [InformesController],
  providers: [InformesService],
})
export class InformesModule {}
