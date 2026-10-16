import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HospitalesController } from './hospitales.controller.js';
import { Hospital } from './hospital.entity.js';
import { HospitalesService } from './hospitales.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Hospital])],
  controllers: [HospitalesController],
  providers: [HospitalesService],
  exports: [TypeOrmModule],
})
export class HospitalesModule {}
