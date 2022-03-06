import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ZipcodeWeatherStatus } from 'app/weather-forecast/interfaces/zipcode-weather-status.interface';

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

  getImageForCondition(condition: string) {
    let imageName = 'sun';
    switch (condition.toLowerCase()) {
      case 'clear':
        imageName = 'sun';
        break;
      case 'clouds':
        imageName = 'clouds';
        break;
      case 'snow':
        imageName = 'snow';
        break;
    }
    return `https://www.angulartraining.com/images/weather/${imageName}.png`
  }

  removeLocation() {
    this.onRemoveLocationClicked.emit(this.weatherInfo.zipCode);
  }

}
