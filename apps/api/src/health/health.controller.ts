import { Controller, Get } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { Public } from '../common/roles.js';

@Controller('health')
export class HealthController {
  @Public()
  @SkipThrottle()
  @Get()
  estado() {
    return { status: 'ok' };
  }
}
