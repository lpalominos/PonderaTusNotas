import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculoPromedioComponent } from './calculo-promedio.component';

describe('CalculoPromedioComponent', () => {
  let component: CalculoPromedioComponent;
  let fixture: ComponentFixture<CalculoPromedioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculoPromedioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculoPromedioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
