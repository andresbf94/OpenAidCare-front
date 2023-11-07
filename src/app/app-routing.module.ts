import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { SensorsComponent } from './views/sensors/sensors.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'sensors', component: SensorsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
