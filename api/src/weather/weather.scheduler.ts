import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { AlertsService } from '../alerts/alerts.service';
import { WeatherService } from './weather.service';

@Injectable()
export class WeatherScheduler {
  private readonly logger = new Logger(
    WeatherScheduler.name,
  );

  constructor(
    private readonly alertsService: AlertsService,
    private readonly weatherService: WeatherService,
  ) {}

  @Cron('*/5 * * * *')
  async handleCron() {
    this.logger.log('Checking weather alerts...');

    const alerts =
      await this.alertsService.findAll();

    for (const alert of alerts) {
      if (!alert.enabled) continue;

      try {
        const weather =
          await this.weatherService.getWeather(
            alert.city,
          );

        this.logger.log(
          `${alert.city}: ${weather.main.temp}°C`,
        );
      } catch (error) {
        this.logger.error(
          `Failed to fetch weather for ${alert.city}`,
          error instanceof Error
            ? error.message
            : String(error),
        );
      }
    }
  }
}