import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  activeElement: string ='rowPrin'; // Inicialmente, no hay ningún elemento activo

  toggleActive(elemento: string) {
    this.activeElement = elemento;
  }
}