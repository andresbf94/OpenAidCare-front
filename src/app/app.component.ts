import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { SensorsComponent } from './views/sensors/sensors.component';
import { NavService } from './services/nav-service.service';

export const serverRoute = 'https://openaidcare-api.herokuapp.com/';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(public navService: NavService) { }

  contentExpanded = 'content-expanded';

  ngOnInit(): void {
    if(this.navService.contentExpanded = true){
      this.contentExpanded= 'content-expanded'
    }
    else{
      this.contentExpanded= 'content-collapsed';
    }
  }
}


