import { TestBed } from '@angular/core/testing';

import { GetAtrasosService } from './get-atrasos.service';

describe('GetAtrasosService', () => {
  let service: GetAtrasosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAtrasosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
