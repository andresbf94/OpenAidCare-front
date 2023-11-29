import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfFilesService {

  baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  uploadFile(file: File, type: string, month: string, year: number): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('archivo', file);
    formData.append('type', type);
    formData.append('name', file.name);
    formData.append('month', month);
    formData.append('year', year.toString());

    return this.http.post<any>(`${this.baseUrl}/uploadFile/${type}`, formData);
  }

  getPdfByType(type: string): Observable<any> {
    const url = `${this.baseUrl}/getPdfByType/${type}`;
    return this.http.get(url, { responseType: 'json' });
  }

  getUniqueYears(type: string): Observable<number[]> {
    const url = `${this.baseUrl}/uniqueYears/${type}`;
    return this.http.get<number[]>(url);
  }

  deleteFile(fileId: string): Observable<any>{
    const url = `${this.baseUrl}/deleteFile/${fileId}`;
    return this.http.delete(url);
  }

  getPdfByTypeAndYear(type: string, year: number): Observable<any[]> {
    const url = `${this.baseUrl}/getPdfByType/${type}/${year}`;
    return this.http.get<any[]>(url);
  }

}
