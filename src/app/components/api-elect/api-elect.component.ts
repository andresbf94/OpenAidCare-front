import { Component } from '@angular/core';

import { ApiElectService } from '../../services/api-elect.service';

@Component({
  selector: 'app-api-elect',
  templateUrl: './api-elect.component.html',
  styleUrls: ['./api-elect.component.css']
})
export class ApiElectComponent {
  datos= [];

  constructor(private apiElectService: ApiElectService){
    apiElectService.getPreciosDia().subscribe((data:any)=>{
      this.datos = data;
      console.log('datos', this.datos);
    })
  }
}
