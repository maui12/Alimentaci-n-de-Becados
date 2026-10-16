import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import type { Response } from 'express';
import { QueryFailedError } from 'typeorm';

/** Traduce errores de PostgreSQL a respuestas HTTP claras (sin filtrar detalles internos). */
@Catch(QueryFailedError)
export class QueryFailedFilter implements ExceptionFilter {
  private readonly logger = new Logger(QueryFailedFilter.name);

  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();
    const code = (exception.driverError as { code?: string } | undefined)?.code;

    if (code === '23505') {
      return res.status(409).json({ statusCode: 409, message: 'Ya existe un registro con esos datos' });
    }
    if (code === '23503') {
      return res
        .status(409)
        .json({ statusCode: 409, message: 'El registro está en uso o referencia datos que no existen' });
    }
    this.logger.error(exception.message, exception.stack);
    return res.status(500).json({ statusCode: 500, message: 'Error interno del servidor' });
  }
}
