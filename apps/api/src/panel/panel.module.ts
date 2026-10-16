import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Becado } from '../becados/becado.entity.js';
import { ConfiguracionModule } from '../configuracion/configuracion.module.js';
import { Pedido } from '../pedidos/pedido.entity.js';
import { PedidosModule } from '../pedidos/pedidos.module.js';
import { Turno } from '../turnos/turno.entity.js';
import { PanelController } from './panel.controller.js';
import { PanelService } from './panel.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Becado, Pedido, Turno]), ConfiguracionModule, PedidosModule],
  controllers: [PanelController],
  providers: [PanelService],
})
export class PanelModule {}
