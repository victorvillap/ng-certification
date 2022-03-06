import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiError } from '../interfaces/api-error.interface';
import { WeatherCondition } from '../interfaces/zipcode-status-response.interface';
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

  private getZipCodeCurrentConditionUrl(zipCode: string): string {
    const baseUrl = environment.locationCurrentConditionUrl;
    const units = environment.weatherServiceUnits;
    const countryCode = environment.weatherServiceCountry;
    const apiKey = environment.weatherServiceApiKey;

    return `${baseUrl}?zip=${zipCode},${countryCode}&units=${units}&appid=${apiKey}`;
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
}
