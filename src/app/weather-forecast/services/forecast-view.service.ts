import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ApiError } from '../interfaces/api-error.interface';
import { ZipcodeWeatherForecast } from '../interfaces/zipcode-weather-forecast';
import { WeatherService } from './weather.service';

@Injectable({
  providedIn: 'root'
})
export class ForecastViewService {

  weatherForecast: Observable<ZipcodeWeatherForecast | ApiError>;
  constructor(private weatherService: WeatherService) { }

  initView(zipCode: string): void {
    this.weatherForecast = this.weatherService.getWeatherForecastForZipCode(zipCode);
  }
}
