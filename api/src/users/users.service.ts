import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './schemas/user.schema';
import { AuthProvider } from '../enums/provider.enum';
import { Role } from '../enums/role.enum';
import { UserStatus } from '../enums/status.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async findByProviderId(providerId: string) {
    return this.userModel.findOne({ providerId }).exec();
  }

  async createUser(user: Partial<User>) {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async findOrCreateGoogleUser(profile: {
    providerId: string;
    email: string;
    name: string;
  }) {
    let user = await this.findByEmail(profile.email);

    if (user) {
      return user;
    }

    user = await this.createUser({
      name: profile.name,
      email: profile.email,
      provider: AuthProvider.GOOGLE,
      providerId: profile.providerId,
      role: Role.USER,
      status: UserStatus.PENDING,
      telegramChatId: undefined,
    });

    return user;
  }
}