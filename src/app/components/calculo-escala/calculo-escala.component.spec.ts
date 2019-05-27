import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculoEscalaComponent } from './calculo-escala.component';

describe('CalculoEscalaComponent', () => {
  let component: CalculoEscalaComponent;
  let fixture: ComponentFixture<CalculoEscalaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculoEscalaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculoEscalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
