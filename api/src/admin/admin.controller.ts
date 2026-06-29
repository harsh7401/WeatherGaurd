import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../decorators/roles.decorator';

@Controller('admin')
@UseGuards(JwtAuthGuard)
@Roles('ADMIN')
export class AdminController {
  @Get('dashboard')
  getDashboard() {
    return {
      message: 'Welcome Admin',
    };
  }
}