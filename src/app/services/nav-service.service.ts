import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavService {
  
  private isDesplegadoSource = new BehaviorSubject<boolean>(false);
  isDesplegado$: Observable<boolean> = this.isDesplegadoSource.asObservable();

  getMargen(): number {
    return this.isDesplegadoSource.value ? 200 : 55;
  }

  toggleDesplegado(isDesplegado: boolean) {
    this.isDesplegadoSource.next(isDesplegado);
  }
  
}