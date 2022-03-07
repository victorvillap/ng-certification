import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForecastViewComponent } from './weather-forecast/pages/forecast-view/forecast-view.component';
import { FrontViewComponent } from './weather-forecast/pages/front-view/front-view.component';

const routes: Routes = [
    { path: 'main', component: FrontViewComponent },
    { path: 'forecast/:zipcode', component: ForecastViewComponent },
    { path: '**', redirectTo: 'main' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }