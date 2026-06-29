import { Injectable } from '@nestjs/common';

import { UsersService } from '../users/users.service';

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
}