import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { WeatherScheduler } from './weather.scheduler';

import { AlertsModule } from '../alerts/alerts.module';
import { TelegramModule } from '../telegram/telegram.module';

@Module({
  imports: [
    HttpModule,
    AlertsModule,
    TelegramModule,
  ],
  controllers: [WeatherController],
  providers: [
    WeatherService,
    WeatherScheduler,
  ],
  exports: [WeatherService],
})
export class WeatherModule {}