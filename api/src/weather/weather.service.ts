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

  async getWeather(city: string) {
    const apiKey = this.config.get<string>('OPENWEATHER_API_KEY');

    console.log('Weather API Key:', apiKey);

    const url =
      `https://api.openweathermap.org/data/2.5/weather` +
      `?q=${city}` +
      `&appid=${apiKey}` +
      `&units=metric`;

    console.log('Weather URL:', url);

    const response = await firstValueFrom(
      this.http.get(url),
    );

    return response.data;
  }
}