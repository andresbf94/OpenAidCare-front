import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serverRoute } from '../app.component';

@Injectable({
  providedIn: 'root',
})
export class MeasuresService {
  urlMeasures = serverRoute + 'api/measures/friendlyname/';
 
  constructor(private http: HttpClient) {}
  

  getMeasures(friendlyName: string): Observable<any> {
    const sept= new Date()
    sept.setMonth(8);
    sept.setDate(1);
    sept.setFullYear(2023);
    return this.http.get(this.urlMeasures + friendlyName + '/'+ sept.toISOString());
  }

 
}
