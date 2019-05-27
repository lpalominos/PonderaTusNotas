import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotasPorcentajesComponent } from './notas-porcentajes.component';

describe('NotasPorcentajesComponent', () => {
  let component: NotasPorcentajesComponent;
  let fixture: ComponentFixture<NotasPorcentajesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotasPorcentajesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotasPorcentajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
