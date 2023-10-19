import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SensorDataService {

  private apiUrl = 'https://openaidcare-python.herokuapp.com/oac';

  constructor(private http: HttpClient) { }

  getSensorData(macAddresses: string[], showTemperature: boolean, showHumidity: boolean, showMinMax: boolean, startDate: string, endDate: string): Observable<any> {
    const macs = macAddresses.join(',');
    const url = `${this.apiUrl}?h_id=${macs}&s_th=${showTemperature ? 't' : ''}&s_th=${showHumidity ? 'h' : ''}&min_max=${showMinMax ? 's' : 'n'}&f_ini=${startDate}&f=${endDate}`;
    return this.http.get(url);
  }
}