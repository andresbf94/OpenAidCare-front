import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SensorDataService {

  private apiUrl = 'https://openaidcare-python.herokuapp.com/oac?h_id=6389e818a89acd31a7aed425&';

  constructor(private http: HttpClient) { }

  getSensorData(macAddresses: string[], showTemperature: string, showMinMax: string, startDate: string, endDate: string){
    if(macAddresses!=undefined) {
      const macs = macAddresses?.join(',');
      const apiURL = `https://openaidcare-python.herokuapp.com/oac?h_id=6389e818a89acd31a7aed425&mac=${macs}&s_th=${showTemperature}&g=ld&r=im&min_max=${showMinMax}&f_ini=${startDate}&f:fin=${endDate}`;
      
      window.open(apiURL, '_blank');
    } 
  }
}