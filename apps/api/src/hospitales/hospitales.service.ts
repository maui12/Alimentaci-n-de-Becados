import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { CrearHospitalDto } from './dto/crear-hospital.dto.js';
import { Hospital } from './hospital.entity.js';

@Injectable()
export class HospitalesService implements OnModuleInit {
  constructor(@InjectRepository(Hospital) private readonly repo: Repository<Hospital>) {}

  /** Datos iniciales: los tres hospitales del proyecto. */
  async onModuleInit() {
    if ((await this.repo.count()) > 0) return;
    await this.repo.save(['La Serena', 'Coquimbo', 'Ovalle'].map((nombre) => this.repo.create({ nombre })));
  }

  listar() {
    return this.repo.find({ order: { nombre: 'ASC' } });
  }

  crear(dto: CrearHospitalDto) {
    return this.repo.save(this.repo.create(dto));
  }
}
