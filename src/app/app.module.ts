import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HousesComponent } from './components/houses/houses.component';
import { SensorsComponent } from './components/sensors/sensors.component';
import { EventsComponent } from './components/events/events.component';
import { TablesComponent } from './components/tables/tables.component';
import { GraphsComponent } from './components/graphs/graphs.component';
import { LogsComponent } from './components/logs/logs.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HousesComponent,
    SensorsComponent,
    EventsComponent,
    TablesComponent,
    GraphsComponent,
    LogsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
