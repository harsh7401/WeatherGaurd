import { Injectable } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { UserStatus } from '../enums/status.enum';

@Injectable()
export class AdminService {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  async getPendingUsers() {
    return this.usersService.findPendingUsers();
  }

  async getAllUsers() {
    return this.usersService.findAllUsers();
  }

  async approveUser(id: string) {
    return this.usersService.approveUser(id);
  }

  async rejectUser(id: string) {
    return this.usersService.rejectUser(id);
  }

  async getDashboardStats() {
    const totalUsers =
      await this.usersService.countUsers();

    const pendingUsers =
      await this.usersService.countUsersByStatus(
        UserStatus.PENDING,
      );

    const approvedUsers =
      await this.usersService.countUsersByStatus(
        UserStatus.APPROVED,
      );

    const rejectedUsers =
      await this.usersService.countUsersByStatus(
        UserStatus.REJECTED,
      );

    const recentUsers =
      await this.usersService.getRecentUsers();

    return {
      totalUsers,
      pendingUsers,
      approvedUsers,
      rejectedUsers,
      recentUsers,
    };
  }
}