import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { SensorsComponent } from './views/sensors/sensors.component';
import { NavService } from './services/nav-service.service';
import { Subscription } from 'rxjs';

export const serverRoute = 'https://openaidcare-api.herokuapp.com/';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  margin: number = 0;
  private subscription: Subscription;

  constructor(private navService: NavService) {
    this.subscription = this.navService.isDesplegado$.subscribe(() => {
      this.actualizarMargen();
    });
  }

  ngOnInit() {
    // Inicializar el margen
    this.actualizarMargen();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private actualizarMargen() {
    this.margin = this.navService.getMargen();
  }
}


