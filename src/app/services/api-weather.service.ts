import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiWeatherService {

  private datosSubjectDias = new BehaviorSubject<any>(null);
  private datosSubjectHoras = new BehaviorSubject<any>(null);

  datosDias$: Observable<any> = this.datosSubjectDias.asObservable();
  datosHoras$: Observable<any> = this.datosSubjectHoras.asObservable();

  constructor(private http: HttpClient){}

  prediccionDiaria() {
    const url = 'https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/33024';
    
    // Crear encabezados con la clave de API
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'api_key': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJpNGxpZmVhbmRyZXNicmFuZG9uQGdtYWlsLmNvbSIsImp0aSI6IjQ1OWQ3OWNkLTkwMjMtNDZhYi1iYTkyLTcyNDM4ZWY4ZTQ2OCIsImlzcyI6IkFFTUVUIiwiaWF0IjoxNjk4NzQwNDk3LCJ1c2VySWQiOiI0NTlkNzljZC05MDIzLTQ2YWItYmE5Mi03MjQzOGVmOGU0NjgiLCJyb2xlIjoiIn0.YjY0GfZrNyF72UzLZhkSyHwAWrmRrdJRThNds1AV99U'
    });
    
    // Hacer la solicitud con los encabezados
    this.http.get(url, { headers: headers }).subscribe((response: any) => {
      if (response && response.estado === 200 && response.datos) {
        const datosUrl = response.datos;
        
        this.http.get(datosUrl).subscribe((datosResponse: any) => {
          this.datosSubjectDias.next(datosResponse); // Enviar los datos a través del observable
        });
      } else {
        console.error('Respuesta inesperada:', response);
      }
    }, error => {
      console.error('Error en la solicitud principal:', error);
    });
  }

  prediccionHoraria(){
    const url = 'https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/horaria/33024';
    
    // Crear encabezados con la clave de API
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'api_key': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJpNGxpZmVhbmRyZXNicmFuZG9uQGdtYWlsLmNvbSIsImp0aSI6IjQ1OWQ3OWNkLTkwMjMtNDZhYi1iYTkyLTcyNDM4ZWY4ZTQ2OCIsImlzcyI6IkFFTUVUIiwiaWF0IjoxNjk4NzQwNDk3LCJ1c2VySWQiOiI0NTlkNzljZC05MDIzLTQ2YWItYmE5Mi03MjQzOGVmOGU0NjgiLCJyb2xlIjoiIn0.YjY0GfZrNyF72UzLZhkSyHwAWrmRrdJRThNds1AV99U'
    });
    
    // Hacer la solicitud con los encabezados
    this.http.get(url, { headers: headers }).subscribe((response: any) => {
      if (response && response.estado === 200 && response.datos) {
        const datosUrl = response.datos;
        
        this.http.get(datosUrl).subscribe((datosResponse: any) => {
          this.datosSubjectHoras.next(datosResponse); // Enviar los datos a través del observable
        });
      } else {
        console.error('Respuesta inesperada:', response);
      }
    }, error => {
      console.error('Error en la solicitud principal:', error);
    });
  }
}
