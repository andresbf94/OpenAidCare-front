import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serverRoute } from '../app.component';

@Injectable({
  providedIn: 'root',
})
export class MeasuresService {
  url = serverRoute + 'api/measures/friendlyname/';

  constructor(private http: HttpClient) {}

  getMeasures(friendlyName: string): Observable<any> {
    return this.http.get(this.url + friendlyName);
  }
}
