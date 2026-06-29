import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateGoogleUser(profile: {
    providerId: string;
    email: string;
    name: string;
  }) {
    return this.usersService.findOrCreateGoogleUser(profile);
  }

  async login(user: any) {
    const payload = {
      sub: user.id,

      email: user.email,

      role: user.role,
    };

    return {
      accessToken: this.jwtService.sign(payload),

      user,
    };
  }
}