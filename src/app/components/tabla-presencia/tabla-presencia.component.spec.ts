import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaPresenciaComponent } from './tabla-presencia.component';

describe('TablaPresenciaComponent', () => {
  let component: TablaPresenciaComponent;
  let fixture: ComponentFixture<TablaPresenciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaPresenciaComponent]
    });
    fixture = TestBed.createComponent(TablaPresenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
