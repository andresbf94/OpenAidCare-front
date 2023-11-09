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
  
  getMeasuresLastWeek(friendlyName: string): Observable<any> {
    // Obtener la fecha actual
    const currentDate = new Date();
    
    // Restar 7 días a la fecha actual
    const sevenDaysAgo = new Date(currentDate);
    sevenDaysAgo.setDate(currentDate.getDate() - 6);
  
    // Formatear la fecha en el formato esperado (YYYY-MM-DD)
    const formattedDate = `${sevenDaysAgo.getFullYear()}-${String(sevenDaysAgo.getMonth() + 1).padStart(2, '0')}-${String(sevenDaysAgo.getDate()).padStart(2, '0')}`;
  
    // Hacer la solicitud HTTP con la fecha formateada
    return this.http.get(this.urlMeasures + friendlyName + '/' + formattedDate);
  }

  getMeasuresCurrentDay(friendlyName: string): Observable<any> {
    // Obtener la fecha actual
    const currentDate = new Date();
    
    // Formatear la fecha en el formato esperado (YYYY-MM-DD)
    const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
  
    // Hacer la solicitud HTTP con la fecha formateada
    return this.http.get(this.urlMeasures + friendlyName + '/' + formattedDate);
  }
  
}
