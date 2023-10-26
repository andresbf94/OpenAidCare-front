import { Injectable } from '@angular/core';
import { serverRoute } from '../app.component';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SensorDataService {

  urlSensors = serverRoute + 'api/front/sensors/';
  piloto3mac = '6389e818a89acd31a7aed425';

  constructor(private http: HttpClient) {}
  
  getSensors(){
    return this.http.get(this.urlSensors + this.piloto3mac)
  }

}