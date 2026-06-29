import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
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

  async getPendingUsers() {
    return this.userModel.find({ status: UserStatus.PENDING }).exec();
  }

  async approveUser(userId: string) {
    return this.userModel.findByIdAndUpdate(
      userId,
      { status: UserStatus.APPROVED },
      { new: true },
    ).exec();
  }
}