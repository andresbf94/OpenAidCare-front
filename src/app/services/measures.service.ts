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
  
  getMeasuresLastMonth(friendlyName: string): Observable<any> {
    // Obtener la fecha actual
    const currentDate = new Date();
    
    // Restar 30 días a la fecha actual para obtener el último mes
    const lastMonth = new Date(currentDate);
    lastMonth.setMonth(currentDate.getMonth() - 1);
  
    // Formatear la fecha en el formato esperado (YYYY-MM-DD)
    const formattedDate = `${lastMonth.getFullYear()}-${String(lastMonth.getMonth() + 1).padStart(2, '0')}-${String(lastMonth.getDate()).padStart(2, '0')}`;
  
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
