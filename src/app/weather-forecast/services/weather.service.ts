import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, } from 'rxjs';
import { map } from 'rxjs/operators';
import { Forecast, ZipCodeForecastResponse } from '../interfaces/zipcode-forecast-response.interface';
import { WeatherCondition } from '../interfaces/zipcode-status-response.interface';
import { DailyForecast, ZipcodeWeatherForecast } from '../interfaces/zipcode-weather-forecast';
import { ZipcodeWeatherStatus } from '../interfaces/zipcode-weather-status.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private httpClient: HttpClient) { }

  getWeatherConditionForZipCode(zipCode: string): Observable<ZipcodeWeatherStatus> {
    const serviceUrl = this.getZipCodeCurrentConditionUrl(zipCode);
    return this.httpClient.get<WeatherCondition>(serviceUrl)
      .pipe(
        map((weatherCondition: WeatherCondition) => this.mapServiceResultToWeatherStatus(zipCode, weatherCondition)),
      );
  }

  getWeatherForecastForZipCode(zipCode: string): Observable<ZipcodeWeatherForecast> {
    const serviceUrl = this.getZipcodeForecastUrl(zipCode);
    return this.httpClient.get<ZipCodeForecastResponse>(serviceUrl)
      .pipe(
        map((forecast: ZipCodeForecastResponse) => this.mapForecastApiResultToApplicationFormat(forecast))
      )
  }

  private getZipCodeCurrentConditionUrl(zipCode: string): string {
    const baseUrl = environment.serviceBaseUrl;
    const weatherService = environment.weatherService;
    const units = environment.weatherServiceUnits;
    const countryCode = environment.weatherServiceCountry;
    const apiKey = environment.weatherServiceApiKey;

    return `${baseUrl}/${weatherService}?zip=${zipCode},${countryCode}&units=${units}&appid=${apiKey}`;
  }

  private mapServiceResultToWeatherStatus(zipcode: string, weatherCondition: WeatherCondition): ZipcodeWeatherStatus {
    const result = {
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
    const baseUrl = environment.serviceBaseUrl;
    const forecastService = environment.forecastService;
    const units = environment.weatherServiceUnits;
    const countryCode = environment.weatherServiceCountry;
    const apiKey = environment.weatherServiceApiKey;
    const forecastDays = environment.forecastDays;

    return `${baseUrl}/${forecastService}?zip=${zipCode},${countryCode}&units=${units}&cnt=${forecastDays}&appid=${apiKey}`;
  }

  private mapForecastApiResultToApplicationFormat(forecast: ZipCodeForecastResponse): ZipcodeWeatherForecast {
    const dailyForecasts = forecast.list.map(element => this.mapApiDailyForecastToApplicationFormat(element));
    return {
      name: forecast.city.name,
      forecast: dailyForecasts
    }
  }

  private mapApiDailyForecastToApplicationFormat(element: Forecast): DailyForecast {
    const forecastDate = this.unixTimestampToDate(element.dt);
    return {
      date: forecastDate,
      condition: element.weather[0]?.main,
      maxTemperature: element.temp.max,
      minTemperature: element.temp.min
    }
  }

  private unixTimestampToDate(timeStamp: number): Date {
    return new Date(timeStamp * 1000);
  }

}
