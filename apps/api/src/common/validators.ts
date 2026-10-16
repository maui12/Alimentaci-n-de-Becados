import { applyDecorators } from '@nestjs/common';
import { IsISO8601, Matches } from 'class-validator';

/** Fecha en formato AAAA-MM-DD y que exista de verdad (rechaza 2026-02-30). */
export const FechaISO = () =>
  applyDecorators(
    Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'La fecha debe tener formato AAAA-MM-DD' }),
    IsISO8601({ strict: true }),
  );
