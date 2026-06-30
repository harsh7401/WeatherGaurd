import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Alert } from './schemas/alert.schema';

import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';

@Injectable()
export class AlertsService {
  constructor(
    @InjectModel(Alert.name)
    private readonly alertModel: Model<Alert>,
  ) {}

  async create(createAlertDto: CreateAlertDto) {
    const alert = new this.alertModel(createAlertDto);
    return alert.save();
  }

  async findAll() {
    return this.alertModel
      .find()
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string) {
    const alert = await this.alertModel.findById(id);

    if (!alert) {
      throw new NotFoundException('Alert not found');
    }

    return alert;
  }

  async update(
    id: string,
    updateAlertDto: UpdateAlertDto,
  ) {
    const alert =
      await this.alertModel.findByIdAndUpdate(
        id,
        updateAlertDto,
        {
          new: true,
        },
      );

    if (!alert) {
      throw new NotFoundException('Alert not found');
    }

    return alert;
  }

  async remove(id: string) {
    const alert =
      await this.alertModel.findByIdAndDelete(id);

    if (!alert) {
      throw new NotFoundException('Alert not found');
    }

    return {
      message: 'Alert deleted successfully',
    };
  }
}