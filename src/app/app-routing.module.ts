import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { SensorsComponent } from './views/sensors/sensors.component';
import { ConsumosHorasBombasComponent } from './components/consumos-horas-bombas/consumos-horas-bombas.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'sensors', component: SensorsComponent},
  {path: 'consumos', component: ConsumosHorasBombasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
