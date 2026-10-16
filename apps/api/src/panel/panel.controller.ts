import { Controller, Get, Query } from '@nestjs/common';
import { MesQueryDto } from '../common/dto/mes-query.dto.js';
import { PanelService } from './panel.service.js';

@Controller('panel')
export class PanelController {
  constructor(private readonly panel: PanelService) {}

  /** GET /api/panel/resumen?anio=2026&mes=6 */
  @Get('resumen')
  resumen(@Query() q: MesQueryDto) {
    return this.panel.resumen(q);
  }
}
