import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempHumedadActualComponent } from './temp-humedad-actual.component';

describe('TempHumedadActualComponent', () => {
  let component: TempHumedadActualComponent;
  let fixture: ComponentFixture<TempHumedadActualComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TempHumedadActualComponent]
    });
    fixture = TestBed.createComponent(TempHumedadActualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
