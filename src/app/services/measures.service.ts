import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeasuresService {

  url = "http://localhost:3000/api/measures/friendlyname/"

  constructor( private http: HttpClient) { }

  getMeasures(friendlyName: string): Observable<any>{
    return this.http.get(this.url + friendlyName);
  }
}
