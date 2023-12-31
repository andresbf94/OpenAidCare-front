import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SensorsComponent } from './views/sensors/sensors.component';
import { HttpClientModule } from '@angular/common/http';
import { LogInComponent } from './log-in/log-in.component';
import { Angular2SmartTableModule } from 'angular2-smart-table';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { TablaPresenciaComponent } from './components/tabla-presencia/tabla-presencia.component';
import { NavComponent } from './components/nav/nav.component';
import { HeaderComponent } from './components/header/header.component';
import { TempHumedadActualComponent } from './components/temp-humedad-actual/temp-humedad-actual.component';
import { WeatherComponent } from './components/weather/weather.component';
import { CustomButtonComponent } from '../app/views/sensors/sensors.component';
import { ConsumosHorasBombasComponent } from './views/calculadoraConsumos/consumos-horas-bombas.component';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './components/loader/loader.component';
import { FileUploaderComponent } from './components/pdf-viewer/file-uploader.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { NgxPaginationModule } from 'ngx-pagination';

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
    WeatherComponent,
    CustomButtonComponent,
    ConsumosHorasBombasComponent,
    LoaderComponent,
    FileUploaderComponent,
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    Angular2SmartTableModule,
    FormsModule,
    NgxExtendedPdfViewerModule,
    NgxPaginationModule
  ],
  
  exports: [RouterModule],
  providers: [CustomButtonComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
