import { Component, OnInit, Renderer2 } from '@angular/core';
import { NavService } from 'src/app/services/nav-service.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  menuBtn: any;
  sideMenu: any;
  
  constructor(private navService: NavService) {}
  
  menuExpanded = false;

  toggleMenu() {
    this.menuExpanded = !this.menuExpanded;

    this.navService.contentExpanded=false;
  }

}