import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontViewComponent } from './weather-forecast/pages/front-view/front-view.component';

const routes: Routes = [
    { path: 'main', component: FrontViewComponent },
    { path: '**', redirectTo: 'main' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }