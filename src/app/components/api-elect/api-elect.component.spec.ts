import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiElectComponent } from './api-elect.component';

describe('ApiElectComponent', () => {
  let component: ApiElectComponent;
  let fixture: ComponentFixture<ApiElectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApiElectComponent]
    });
    fixture = TestBed.createComponent(ApiElectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
