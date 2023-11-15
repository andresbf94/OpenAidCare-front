import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumosHorasBombasComponent } from './consumos-horas-bombas.component';

describe('ConsumosHorasBombasComponent', () => {
  let component: ConsumosHorasBombasComponent;
  let fixture: ComponentFixture<ConsumosHorasBombasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsumosHorasBombasComponent]
    });
    fixture = TestBed.createComponent(ConsumosHorasBombasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
