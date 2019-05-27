import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaEscalaComponent } from './vista-escala.component';

describe('VistaEscalaComponent', () => {
  let component: VistaEscalaComponent;
  let fixture: ComponentFixture<VistaEscalaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaEscalaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaEscalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
