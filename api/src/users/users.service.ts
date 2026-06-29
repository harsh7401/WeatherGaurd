import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async findByProviderId(providerId: string) {
    return this.userModel.findOne({ providerId }).exec();
  }

  async findById(id: string) {
    return this.userModel.findById(id).exec();
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
      providerId: profile.providerId,
      email: profile.email,
      name: profile.name,
      provider: 'google',
      role: 'USER',
      status: 'PENDING',
    });

    return user;
  }

  // -----------------------
  // Admin Methods
  // -----------------------

  async findPendingUsers() {
    return this.userModel.find({ status: 'PENDING' }).exec();
  }

  async findAllUsers() {
    return this.userModel.find().exec();
  }

  async approveUser(id: string) {
    return this.userModel.findByIdAndUpdate(
      id,
      {
        status: 'APPROVED',
      },
      {
        new: true,
      },
    );
  }

  async rejectUser(id: string) {
    return this.userModel.findByIdAndUpdate(
      id,
      {
        status: 'REJECTED',
      },
      {
        new: true,
      },
    );
  }
}