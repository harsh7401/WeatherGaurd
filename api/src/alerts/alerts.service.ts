import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Alert } from './schemas/alert.schema';

@Injectable()
export class AlertsService {
  constructor(
    @InjectModel(Alert.name)
    private readonly alertModel: Model<Alert>,
  ) {}

  async findAll() {
    return this.alertModel.find().sort({ createdAt: -1 });
  }

  async findById(id: string) {
    return this.alertModel.findById(id);
  }

  async create(data: {
    title: string;
    description: string;
    city: string;
    severity: string;
    enabled?: boolean;
  }) {
    const alert = new this.alertModel({
      ...data,
      enabled: data.enabled ?? true,
    });

    return alert.save();
  }

  async update(
    id: string,
    data: Partial<{
      title: string;
      description: string;
      city: string;
      severity: string;
      enabled: boolean;
    }>,
  ) {
    return this.alertModel.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  async delete(id: string) {
    return this.alertModel.findByIdAndDelete(id);
  }

  async toggle(id: string) {
    const alert = await this.alertModel.findById(id);

    if (!alert) {
      return null;
    }

    alert.enabled = !alert.enabled;

    return alert.save();
  }
}