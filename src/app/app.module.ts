import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { WeatherForecastModule } from './weather-forecast/weather-forecast.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    WeatherForecastModule
  ],
  declarations: [
    AppComponent,
    HelloComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
