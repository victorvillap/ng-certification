import { Component, Input, OnInit } from '@angular/core';
import { ApiError } from 'app/weather-forecast/interfaces/api-error.interface';
import { ZipcodeWeatherForecast } from 'app/weather-forecast/interfaces/zipcode-weather-forecast';
import { mapConditionToImageName } from 'app/weather-forecast/utils/map-condition-to-image';
import { Observable } from 'rxjs';

@Component({
  selector: 'location-future-forecast',
  templateUrl: './location-future-forecast.component.html',
  styleUrls: ['./location-future-forecast.component.css']
})
export class LocationFutureForecastComponent implements OnInit {

  @Input('forecast') inputForecast: Observable<ZipcodeWeatherForecast | ApiError>;

  forecast: ZipcodeWeatherForecast | undefined = undefined;
  apiError: ApiError | undefined = undefined;

  constructor() { }

  ngOnInit(): void {
    this.inputForecast.subscribe(value => {
      if ('errorMessage' in value) {
        this.apiError = value;
      } else {
        this.forecast = value;
      }
    });
  }

  getImageForCondition(condition: string): string {
    const imageName = mapConditionToImageName(condition);
    return `https://www.angulartraining.com/images/weather/${imageName}.png`
  }

}
