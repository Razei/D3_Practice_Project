import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WeatherModule} from './weather/weather.module';
import {HomepageComponent} from './homepage/homepage.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'weather', component: WeatherModule }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
