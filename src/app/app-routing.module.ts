import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { SensorsComponent } from './views/sensors/sensors.component';
import { ConsumosHorasBombasComponent } from './views/calculadoraConsumos/consumos-horas-bombas.component';
import { FileUploaderComponent } from './components/pdf-viewer/file-uploader.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'sensors', component: SensorsComponent},
  {path: 'consumos', component: ConsumosHorasBombasComponent},
  {path: 'facturas', component: FileUploaderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
