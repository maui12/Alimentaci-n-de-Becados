import { Controller, Get, Query } from '@nestjs/common';
import { InformeQueryDto } from './dto/informe-query.dto.js';
import { InformesService } from './informes.service.js';

@Controller('informes')
export class InformesController {
  constructor(private readonly informes: InformesService) {}

  /** GET /api/informes/hospitales?desde=2026-06-01&hasta=2026-06-30 */
  @Get('hospitales')
  porHospital(@Query() q: InformeQueryDto) {
    return this.informes.porHospital(q);
  }
}
