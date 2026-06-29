import {
  Controller,
  Get,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';

import { AdminService } from './admin.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../decorators/roles.decorator';

@Controller('admin')
@UseGuards(JwtAuthGuard)
@Roles('ADMIN')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
  ) {}

  @Get('pending-users')
  getPendingUsers() {
    return this.adminService.getPendingUsers();
  }

  @Get('users')
  getAllUsers() {
    return this.adminService.getAllUsers();
  }

  @Patch('approve/:id')
  approveUser(@Param('id') id: string) {
    return this.adminService.approveUser(id);
  }

  @Patch('reject/:id')
  rejectUser(@Param('id') id: string) {
    return this.adminService.rejectUser(id);
  }
}