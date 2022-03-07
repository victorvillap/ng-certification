import { Component, Input, OnInit } from '@angular/core';
import { ZipcodeWeatherForecast } from 'app/weather-forecast/interfaces/zipcode-weather-forecast';
import { mapConditionToImageName } from 'app/weather-forecast/utils/map-condition-to-image';

@Component({
  selector: 'location-future-forecast',
  templateUrl: './location-future-forecast.component.html',
  styleUrls: ['./location-future-forecast.component.css']
})
export class LocationFutureForecastComponent implements OnInit {

  @Input() forecast: ZipcodeWeatherForecast

  constructor() { }

  ngOnInit(): void {
  }

  getImageForCondition(condition: string): string {
    const imageName = mapConditionToImageName(condition);
    return `https://www.angulartraining.com/images/weather/${imageName}.png`
  }

}
