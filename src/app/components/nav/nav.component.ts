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
  menuExpanded = false;
  isDesplegado: boolean = false;

  constructor(private navService: NavService) {}

  toggleDesplegar() {
    // Lo desplegamos en la vista
    this.menuExpanded = !this.menuExpanded;
    // Lo desplegamos tambien en el servicio para asi poder modificar el resto de componentes en consecuencia
    this.isDesplegado = !this.isDesplegado;
    this.navService.toggleDesplegado(this.isDesplegado);
    
  }
}