import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  rowPrinActive: boolean = true; // Inicialmente, rowPrin es activo
  rowSecActive: boolean = false;

  toggleActive(elemento: string) {
    if (elemento === 'rowPrin') {
      this.rowPrinActive = true;
      this.rowSecActive = false;
    } else {
      this.rowSecActive = true;
      this.rowPrinActive = false;
    }
  }
}
