import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { AlertsService } from '../alerts/alerts.service';
import { WeatherService } from './weather.service';
import { TelegramService } from '../telegram/telegram.service';

@Injectable()
export class WeatherScheduler {
  private readonly logger = new Logger(
    WeatherScheduler.name,
  );

  constructor(
    private readonly alertsService: AlertsService,
    private readonly weatherService: WeatherService,
    private readonly telegramService: TelegramService,
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
          await this.weatherService.getCurrentWeather(
            alert.city,
          );

        await this.telegramService.sendAlert({
          title: alert.title,
          city: alert.city,
          severity: alert.severity,
          description: `${weather.weather[0].main}
Temperature: ${weather.main.temp}°C`,
        });

        this.logger.log(
          `Telegram alert sent for ${alert.city}`,
        );
      } catch (error) {
        this.logger.error(
          `Failed to process ${alert.city}`,
          error instanceof Error
            ? error.message
            : String(error),
        );
      }
    }
  }
}