import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WeatherService {
  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {}

  async getCurrentWeather(city: string) {
    const apiKey =
      this.config.get<string>('OPENWEATHER_API_KEY');

    const url =
      `https://api.openweathermap.org/data/2.5/weather` +
      `?q=${city}` +
      `&appid=${apiKey}` +
      `&units=metric`;

    const response = await firstValueFrom(
      this.http.get(url),
    );

    return response.data;
  }
}