import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, zip } from 'rxjs';
import { ApiError } from '../interfaces/api-error.interface';
import { ZipcodeWeatherStatus } from '../interfaces/zipcode-weather-status.interface';
import { StoreManagementService } from './store-management.service';
import { WeatherService } from './weather.service';

@Injectable({
  providedIn: 'root'
})
export class FrontViewService {

  private storedZipCodes$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  storedZipCodes: Observable<string[]> = this.storedZipCodes$.asObservable();

  private weatherConditions$: BehaviorSubject<ZipcodeWeatherStatus[]> = new BehaviorSubject<ZipcodeWeatherStatus[]>([]);
  weatherConditions: Observable<ZipcodeWeatherStatus[]> = this.weatherConditions$.asObservable();

  private apiErrors$: BehaviorSubject<ApiError[]> = new BehaviorSubject<ApiError[]>([]);
  apiErrors: Observable<ApiError[]> = this.apiErrors$.asObservable();

  constructor(private storageService: StoreManagementService,
    private weatherService: WeatherService) { }

  initView(): void {
    this.storedZipCodes$.subscribe(zipCodes => this.getWeatherConditionsForZipCodeList(zipCodes));
    this.updateSavedZipCodes();
  }

  addZipCode(zipCode: string): void {
    this.clearErrors();
    this.getWeatherConditionsForZipCode(zipCode);
    this.updateSavedZipCodes();
  }

  removeZipCode(zipCode: string): void {
    const weatherConditions = this.weatherConditions$.value;
    this.weatherConditions$.next(weatherConditions.filter((condition: ZipcodeWeatherStatus) => condition.zipCode !== zipCode));
    this.storageService.deleteZipCode(zipCode);
  }

  getWeatherConditionsForZipCodeList(zipCodes: string[]): void {
    this.clearErrors();
    const codesAlreadyResolved = this.weatherConditions$.value.map(weatherReport => weatherReport.zipCode);
    const newZipCodes = zipCodes.filter(zipCode => !codesAlreadyResolved.includes(zipCode));
    newZipCodes.forEach(zipCode => this.getWeatherConditionsForZipCode(zipCode));
  }

  private updateSavedZipCodes(): void {
    this.storedZipCodes$.next(this.storageService.getStoredZipCodes());
  }

  private getWeatherConditionsForZipCode(zipCode: string): void {
    this.weatherService.getWeatherConditionForZipCode(zipCode)
      .subscribe({
        next: (weatherReport: ZipcodeWeatherStatus) => {
          this.addWeatherConditionsToList(weatherReport);
          this.storageService.saveZipCode(zipCode);
        },
        error: ((error: HttpErrorResponse) => this.addError(error, zipCode))
      });
  }

  private addWeatherConditionsToList(weatherCondition: ZipcodeWeatherStatus): void {
    const savedList = this.weatherConditions$.value;
    savedList.push(weatherCondition);
    this.weatherConditions$.next(savedList);
  }

  private clearErrors(): void {
    this.apiErrors$.next([]);
  }

  private addError(error: HttpErrorResponse, zipCode: string) {
    const storedErrors = this.apiErrors$.value;
    const apiError: ApiError = {
      zipCode: zipCode,
      errorMessage: error.message
    }
    storedErrors.push(apiError);
    this.apiErrors$.next(storedErrors);
  }
}
