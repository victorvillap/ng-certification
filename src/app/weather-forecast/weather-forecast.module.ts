import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AddLocationFormComponent } from './components/add-location-form/add-location-form.component';
import { FrontViewComponent } from './pages/front-view/front-view.component';
import { LocationCurrentConditionComponent } from './components/location-current-condition/location-current-condition.component';
import { LocationFutureForecastComponent } from './components/location-future-forecast/location-future-forecast.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ZipcodeListErrorComponent } from './components/zipcode-list-error/zipcode-list-error.component';



@NgModule({
  declarations: [
    AddLocationFormComponent,
    FrontViewComponent,
    LocationCurrentConditionComponent,
    LocationFutureForecastComponent,
    ZipcodeListErrorComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    FrontViewComponent
  ]
})
export class WeatherForecastModule { }
