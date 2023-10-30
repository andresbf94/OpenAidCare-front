import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiElectService {
  
 
  constructor(private http: HttpClient) { }

  getPreciosDia() {
    return  this.http.get('https://api.preciodelaluz.org/v1/prices/all?zone=PCB')
  }
  
}


