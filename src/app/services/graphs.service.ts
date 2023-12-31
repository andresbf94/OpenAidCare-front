import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { serverRoute } from '../app.component';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GraphsService {
  private graphUrlSubject = new BehaviorSubject<string>('');
  public graphButtonClicked: EventEmitter<any> = new EventEmitter<any>();

  graphUrl$ = this.graphUrlSubject.asObservable();
  sensoresUrl = serverRoute + 'api/sensor/friendlyName/';

  constructor(private http: HttpClient) {}

  getGraph(
    macAddresses: string[],
    showTemperature: string,
    showMinMax: string,
    startDate: string
  ) {
    if (macAddresses != undefined) {
      const macs = macAddresses?.join(',');
      const apiURL = `https://openaidcare-python.herokuapp.com/oac?h_id=6389e818a89acd31a7aed425&mac=${macs}&s_th=${showTemperature}&g=ld&r=im&min_max=${showMinMax}&f_ini=${startDate}`;
      this.graphUrlSubject.next(apiURL); // Actualizar el BehaviorSubject con el nuevo valor
      return of(null);
    }
    return of(null);
  }

  putFriendlyName(friendlyName: string, mac: string) {
    return this.http.put(this.sensoresUrl + mac, {
      friendlyName: friendlyName,
    });
  }
}
