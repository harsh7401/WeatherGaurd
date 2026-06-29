import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  async validateGoogleUser(profile: {
    providerId: string;
    email: string;
    name: string;
  }) {
    return this.usersService.findOrCreateGoogleUser(profile);
  }
}