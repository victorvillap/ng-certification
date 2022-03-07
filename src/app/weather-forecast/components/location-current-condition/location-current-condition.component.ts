import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ZipcodeWeatherStatus } from 'app/weather-forecast/interfaces/zipcode-weather-status.interface';
import { mapConditionToImageName } from 'app/weather-forecast/utils/map-condition-to-image';

@Component({
  selector: 'location-current-condition',
  templateUrl: './location-current-condition.component.html',
  styleUrls: ['./location-current-condition.component.css']
})
export class LocationCurrentConditionComponent implements OnInit {

  @Input() weatherInfo!: ZipcodeWeatherStatus;
  @Output() onRemoveLocationClicked: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  getImageForCondition(condition: string): string {
    const imageName = mapConditionToImageName(condition);
    return `https://www.angulartraining.com/images/weather/${imageName}.png`
  }

  removeLocation(): void {
    this.onRemoveLocationClicked.emit(this.weatherInfo.zipCode);
  }

}
