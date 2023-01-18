import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphsMenuComponent } from './graphs-menu.component';

describe('GraphsMenuComponent', () => {
  let component: GraphsMenuComponent;
  let fixture: ComponentFixture<GraphsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphsMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
