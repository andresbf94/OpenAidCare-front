import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfFilesService {

  baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  uploadFile(file: File, type: string): Observable<any> {
    const formData = new FormData();
    formData.append('archivo', file);
    formData.append('nombre', file.name); // Agrega el nombre del archivo al FormData
  
    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });
  
    return this.http.post(`${this.baseUrl}/uploadFile/${type}`, formData, { headers });
  }

  getPdfByType(type: string): Observable<any> {
    const url = `${this.baseUrl}/getPdfByType/${type}`;
    return this.http.get(url, { responseType: 'json' });
  }
}
