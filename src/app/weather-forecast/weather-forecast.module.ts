import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AddLocationFormComponent } from './components/add-location-form/add-location-form.component';
import { FrontViewComponent } from './pages/front-view/front-view.component';
import { LocationCurrentConditionComponent } from './components/location-current-condition/location-current-condition.component';
import { LocationFutureForecastComponent } from './components/location-future-forecast/location-future-forecast.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ZipcodeListErrorComponent } from './components/zipcode-list-error/zipcode-list-error.component';
import { RouterModule } from '@angular/router';
import { ForecastViewComponent } from './pages/forecast-view/forecast-view.component';



@NgModule({
  declarations: [
    AddLocationFormComponent,
    FrontViewComponent,
    LocationCurrentConditionComponent,
    LocationFutureForecastComponent,
    ZipcodeListErrorComponent,
    ForecastViewComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    FrontViewComponent,
    ForecastViewComponent
  ]
})
export class WeatherForecastModule { }
