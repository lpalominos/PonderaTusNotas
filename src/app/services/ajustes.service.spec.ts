import { TestBed } from '@angular/core/testing';

import { AjustesService } from './ajustes.service';

describe('AjustesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AjustesService = TestBed.get(AjustesService);
    expect(service).toBeTruthy();
  });
});
