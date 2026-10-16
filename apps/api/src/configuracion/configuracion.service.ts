import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Configuracion } from './configuracion.entity.js';
import type { ActualizarConfiguracionDto } from './dto/actualizar-configuracion.dto.js';

@Injectable()
export class ConfiguracionService {
  constructor(@InjectRepository(Configuracion) private readonly repo: Repository<Configuracion>) {}

  async obtener(): Promise<Configuracion> {
    const existente = await this.repo.findOneBy({ id: 1 });
    return existente ?? (await this.repo.save(this.repo.create({ id: 1 })));
  }

  async actualizar(dto: ActualizarConfiguracionDto): Promise<Configuracion> {
    const actual = await this.obtener();
    return this.repo.save(Object.assign(actual, dto));
  }
}
