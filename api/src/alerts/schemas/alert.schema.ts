import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { AlertSeverity } from '../enums/severity.enum';

export type AlertDocument = HydratedDocument<Alert>;

@Schema({
  timestamps: true,
})
export class Alert {
  @Prop({
    required: true,
  })
  title!: string;

  @Prop({
    required: true,
  })
  description!: string;

  @Prop({
    required: true,
  })
  city!: string;

  @Prop({
    type: String,
    enum: AlertSeverity,
    default: AlertSeverity.MEDIUM,
  })
  severity!: AlertSeverity;

  @Prop({
    default: true,
  })
  enabled!: boolean;
}

export const AlertSchema = SchemaFactory.createForClass(Alert);