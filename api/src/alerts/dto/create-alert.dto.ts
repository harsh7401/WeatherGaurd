import { AlertSeverity } from '../enums/severity.enum';

export class CreateAlertDto {
  title!: string;

  description!: string;

  city!: string;

  severity!: AlertSeverity;

  enabled?: boolean;
}