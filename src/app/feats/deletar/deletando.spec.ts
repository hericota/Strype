import { TestBed } from '@angular/core/testing';

import { Deletando } from './deletando';

describe('Deletando', () => {
  let service: Deletando;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Deletando);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
