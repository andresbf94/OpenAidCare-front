import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SensorsComponent } from './components/sensors/sensors.component';
import { HttpClientModule } from '@angular/common/http';
import { LogInComponent } from './log-in/log-in.component';
import { Angular2SmartTableModule } from 'angular2-smart-table';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TablaPresenciaComponent } from './components/tabla-presencia/tabla-presencia.component';
import { NavComponent } from './components/nav/nav.component';
import { HeaderComponent } from './components/header/header.component';
import { TempHumedadActualComponent } from './components/temp-humedad-actual/temp-humedad-actual.component';
import { PanelPrincipalComponent } from './views/panel-principal/panel-principal.component';


const routes: Routes = [
  
];

@NgModule({
  declarations: [
    AppComponent,
    SensorsComponent,
    LogInComponent,
    HomeComponent,
    TablaPresenciaComponent,
    NavComponent,
    HeaderComponent,
    TempHumedadActualComponent,
    PanelPrincipalComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    Angular2SmartTableModule,
    RouterModule.forRoot(routes)

  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
