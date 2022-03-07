import { Injectable } from '@angular/core';
import { ZipcodeWeatherForecast } from '../interfaces/zipcode-weather-forecast';
import { WeatherService } from './weather.service';

@Injectable({
  providedIn: 'root'
})
export class ForecastViewService {

  weatherForecast: ZipcodeWeatherForecast;

  constructor(private weatherService: WeatherService) { }

  initView(zipCode: string): void {
    this.weatherService.getWeatherForecastForZipCode(zipCode)
      .subscribe((forecast: ZipcodeWeatherForecast) => this.weatherForecast = forecast);
  }
}
