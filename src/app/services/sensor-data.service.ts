import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { serverRoute } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class SensorDataService {

  private apiUrl = 'https://openaidcare-python.herokuapp.com/oac?h_id=6389e818a89acd31a7aed425&';
  url = serverRoute + 'api/sensor/friendlyName/';
  constructor(private http: HttpClient) { }

  getSensorData(macAddresses: string[], showTemperature: string, showMinMax: string, startDate: string){
    if(macAddresses!=undefined) {
      const macs = macAddresses?.join(',');
      const apiURL = `https://openaidcare-python.herokuapp.com/oac?h_id=6389e818a89acd31a7aed425&mac=${macs}&s_th=${showTemperature}&g=ld&r=im&min_max=${showMinMax}&f_ini=${startDate}`;
      
      window.open(apiURL, '_blank');
    } 
  }
  
  putFriendlyName(friendlyName: string, mac:string) {
    return this.http.put(this.url + mac, {friendlyName:friendlyName} );
  }
  
}