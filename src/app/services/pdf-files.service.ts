import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfFilesService {

  urlServer = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  uploadFile(file: File, type: string): Observable<any> {
    const formData = new FormData();
    formData.append('archivo', file);

    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });

    return this.http.post(`${this.urlServer}/uploadFile/${type}`, formData, { headers });
  }

  downloadPdfByType(type: string): Observable<any> {
    return this.http.get(`${this.urlServer}/getPdfByType/${type}`, {
      responseType: 'arraybuffer',
      observe: 'response'
    });
  }
}
