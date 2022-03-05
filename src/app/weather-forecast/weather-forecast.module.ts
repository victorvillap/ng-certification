import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddLocationFormComponent } from './components/add-location-form/add-location-form.component';
import { FrontViewComponent } from './pages/front-view/front-view.component';
import { LocationCurrentConditionComponent } from './components/location-current-condition/location-current-condition.component';
import { LocationFutureForecastComponent } from './components/location-future-forecast/location-future-forecast.component';



@NgModule({
  declarations: [
    AddLocationFormComponent,
    FrontViewComponent,
    LocationCurrentConditionComponent,
    LocationFutureForecastComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FrontViewComponent
  ]
})
export class WeatherForecastModule { }
