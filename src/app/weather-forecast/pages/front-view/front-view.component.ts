import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiError } from 'app/weather-forecast/interfaces/api-error.interface';
import { ZipcodeWeatherStatus } from 'app/weather-forecast/interfaces/zipcode-weather-status.interface';
import { FrontViewService } from 'app/weather-forecast/services/front-view.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-front-view',
  templateUrl: './front-view.component.html',
  styleUrls: ['./front-view.component.css']
})
export class FrontViewComponent implements OnInit, OnDestroy {

  storedWeatherConditions: ZipcodeWeatherStatus[] = [];
  private weatherConditionsSubscription!: Subscription;

  apiErrors: ApiError[] = [];
  private errorsSubscription!: Subscription;


  constructor(public viewService: FrontViewService) { }

  ngOnInit(): void {
    this.viewService.initView();
    this.weatherConditionsSubscription = this.viewService.weatherConditions
      .subscribe(zipCodes => this.storedWeatherConditions = zipCodes);

    this.errorsSubscription = this.viewService.apiErrors
      .subscribe(errors => this.apiErrors = errors);
  }

  ngOnDestroy(): void {
    this.weatherConditionsSubscription?.unsubscribe();
    this.errorsSubscription?.unsubscribe();
  }

  addLocation(zipCode: string): void {
    this.viewService.addZipCode(zipCode);
  }

  removeLocation(zipCode: string): void {
    this.viewService.removeZipCode(zipCode);
  }

  areErrorsInApiCalls(): boolean {
    return this.apiErrors?.length > 0;
  }

}
