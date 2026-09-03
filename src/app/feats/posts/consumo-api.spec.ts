import { TestBed } from '@angular/core/testing';
import { ConsumoApi } from './consumo-api';

describe('ConsumoApi', () => {
  let service: ConsumoApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsumoApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
