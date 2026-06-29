import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from '../../enums/role.enum';
import { UserStatus } from '../../enums/status.enum';
import { AuthProvider } from '../../enums/provider.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, trim: true })
  name!: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email!: string;

  @Prop({ required: true, enum: AuthProvider })
  provider!: AuthProvider;

  @Prop({ required: true, unique: true })
  providerId!: string;

  @Prop({ enum: Role, default: Role.USER })
  role!: Role;

  @Prop({ enum: UserStatus, default: UserStatus.PENDING })
  status!: UserStatus;

  @Prop({ default: null })
  telegramChatId?: string;

  createdAt!: Date;
  updatedAt!: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);