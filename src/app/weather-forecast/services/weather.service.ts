import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, } from 'rxjs';
import { map } from 'rxjs/operators';
import { Forecast, ZipCodeForecastResponse } from '../interfaces/weather-api/zipcode-forecast-response.interface';
import { WeatherCondition } from '../interfaces/weather-api/zipcode-status-response.interface';
import { DailyForecast, ZipcodeWeatherForecast } from '../interfaces/zipcode-weather-forecast';
import { ZipcodeWeatherStatus } from '../interfaces/zipcode-weather-status.interface';
import { unixTimestampToDate } from '../utils/unix-timestamp-to-date';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private httpClient: HttpClient) { }

  getWeatherConditionForZipCode(zipCode: string): Observable<ZipcodeWeatherStatus> {
    const serviceUrl: string = this.getZipCodeCurrentConditionUrl(zipCode);
    return this.httpClient.get<WeatherCondition>(serviceUrl)
      .pipe(
        map((weatherCondition: WeatherCondition) => this.mapServiceResultToWeatherStatus(zipCode, weatherCondition)),
      );
  }

  getWeatherForecastForZipCode(zipCode: string): Observable<ZipcodeWeatherForecast> {
    const serviceUrl: string = this.getZipcodeForecastUrl(zipCode);
    return this.httpClient.get<ZipCodeForecastResponse>(serviceUrl)
      .pipe(
        map((forecast: ZipCodeForecastResponse) => this.mapForecastApiResultToApplicationFormat(forecast))
      )
  }

  private getZipCodeCurrentConditionUrl(zipCode: string): string {
    const baseUrl: string = environment.serviceBaseUrl;
    const weatherService: string = environment.weatherService;
    const units: string = environment.weatherServiceUnits;
    const countryCode: string = environment.weatherServiceCountry;
    const apiKey: string = environment.weatherServiceApiKey;

    return `${baseUrl}/${weatherService}?zip=${zipCode},${countryCode}&units=${units}&appid=${apiKey}`;
  }

  private mapServiceResultToWeatherStatus(zipcode: string, weatherCondition: WeatherCondition): ZipcodeWeatherStatus {
    const result: ZipcodeWeatherStatus = {
      zipCode: zipcode,
      locationName: weatherCondition.name,
      currentConditionName: weatherCondition.weather[0]?.main,
      currentConditionIcon: weatherCondition.weather[0]?.icon,
      currentTemperature: weatherCondition.main.temp,
      maxTemperature: weatherCondition.main.temp_max,
      minTemperature: weatherCondition.main.temp_min
    }

    return result;
  }

  private getZipcodeForecastUrl(zipCode: string): string {
    const baseUrl: string = environment.serviceBaseUrl;
    const forecastService: string = environment.forecastService;
    const units: string = environment.weatherServiceUnits;
    const countryCode: string = environment.weatherServiceCountry;
    const apiKey: string = environment.weatherServiceApiKey;
    const forecastDays: number = environment.forecastDays;

    return `${baseUrl}/${forecastService}?zip=${zipCode},${countryCode}&units=${units}&cnt=${forecastDays}&appid=${apiKey}`;
  }

  private mapForecastApiResultToApplicationFormat(forecast: ZipCodeForecastResponse): ZipcodeWeatherForecast {
    const dailyForecasts: DailyForecast[] = forecast.list.map(element => this.mapApiDailyForecastToApplicationFormat(element));
    return {
      name: forecast.city.name,
      forecast: dailyForecasts
    }
  }

  private mapApiDailyForecastToApplicationFormat(element: Forecast): DailyForecast {
    const forecastDate: Date = unixTimestampToDate(element.dt);
    return {
      date: forecastDate,
      condition: element.weather[0]?.main,
      maxTemperature: element.temp.max,
      minTemperature: element.temp.min
    }
  }
}
